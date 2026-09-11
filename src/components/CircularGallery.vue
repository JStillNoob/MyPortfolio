<template>
  <div ref="containerRef" class="circular-gallery-container" />
</template>

<script setup lang="ts">
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl"
import { onMounted, onUnmounted, useTemplateRef, watch } from "vue"

interface CircularGalleryProps {
  items?: { image: string; text: string }[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  fontUrl?: string
  scrollSpeed?: number
  scrollEase?: number
}

const props = withDefaults(defineProps<CircularGalleryProps>(), {
  bend: 2.2,
  textColor: "#f6f6f6",
  borderRadius: 0.06,
  font: "500 22px Roboto, sans-serif",
  scrollSpeed: 2,
  scrollEase: 0.05,
})

const containerRef = useTemplateRef<HTMLDivElement>("containerRef")
let app: any = null
let isMounted = false

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => func.apply(this, args), wait)
  }
}

function createTextTexture(
  gl: any,
  text: string,
  font: string = "500 22px Roboto, sans-serif",
  color: string = "#f6f6f6"
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get 2d context")

  ctx.font = font
  const metrics = ctx.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const fontSize = 22
  const textHeight = Math.ceil(fontSize * 1.3)

  // Use 2x dpr for ultra sharp text
  const dpr = 2
  canvas.width = (textWidth + 40) * dpr
  canvas.height = (textHeight + 20) * dpr

  ctx.scale(dpr, dpr)
  ctx.font = font
  ctx.fillStyle = color
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
  ctx.fillText(text, (textWidth + 40) / 2, (textHeight + 20) / 2)

  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  texture.needsUpdate = true
  return { texture, width: textWidth + 40, height: textHeight + 20 }
}

class Title {
  gl: any
  plane: Mesh
  renderer: Renderer
  text: string
  textColor: string
  font: string
  mesh!: Mesh
  aspect = 1

  constructor({ gl, plane, renderer, text, textColor = "#f6f6f6", font = "500 22px Roboto, sans-serif" }: any) {
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor)
    this.aspect = width / height

    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.05) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    this.mesh.setParent(this.plane)
    this.updateScale(this.plane.scale.x || 4, this.plane.scale.y || 5.2)
  }

  updateScale(parentWidth: number, parentHeight: number) {
    if (!this.mesh) return
    const safeW = Math.max(parentWidth, 0.1)
    const safeH = Math.max(parentHeight, 0.1)

    // Desired true size of text in world space (~16px legible size)
    const worldTextHeight = 1.35
    const worldTextWidth = worldTextHeight * this.aspect

    // Cancel out parent's non-uniform scale so text is 100% distortion-free!
    this.mesh.scale.set(worldTextWidth / safeW, worldTextHeight / safeH, 1)

    // Position text below card bottom edge in parent local coordinates
    const worldMargin = 0.24
    this.mesh.position.y = -0.5 - (worldTextHeight * 0.5 + worldMargin) / safeH
  }

  updateTextColor(newColor: string) {
    this.textColor = newColor
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor)
    this.aspect = width / height
    this.mesh.program.uniforms.tMap.value = texture
    this.updateScale(this.plane.scale.x || 4, this.plane.scale.y || 5.2)
  }
}

class Media {
  gl: any
  geometry: Plane
  image: string
  text: string
  index: number
  length: number
  renderer: Renderer
  scene: Transform
  screen: any
  viewport: any
  bend: number
  textColor: string
  borderRadius: number
  font: string
  program!: Program
  plane!: Mesh
  title!: Title
  padding!: number
  width!: number
  widthTotal!: number
  x!: number
  extra = 0
  speed = 0
  isBefore = false
  isAfter = false

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0.06,
    font,
  }: any) {
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font

    this.createShader()
    this.createMesh()
    this.createTitle()
    this.onResize({ screen, viewport })
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
      minFilter: this.gl.LINEAR_MIPMAP_LINEAR,
      magFilter: this.gl.LINEAR,
      anisotropy: 16,
    })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          float planeAspect = uPlaneSizes.x / max(uPlaneSizes.y, 0.001);
          float imageAspect = uImageSizes.x / max(uImageSizes.y, 0.001);

          // Pure object-fit: cover with zero distortion
          vec2 ratio = vec2(
            min(planeAspect / imageAspect, 1.0),
            min(imageAspect / planeAspect, 1.0)
          );

          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [4, 5.2] },
        uImageSizes: { value: [4, 5.2] },
        uBorderRadius: { value: this.borderRadius },
      },
    })

    const img = new Image()
    img.crossOrigin = "anonymous"
    const onImgLoad = () => {
      texture.image = img
      texture.needsUpdate = true
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
      }
    }
    img.onload = onImgLoad
    img.src = encodeURI(this.image)
    if (img.complete && img.naturalWidth > 0) {
      onImgLoad()
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })
    this.plane.setParent(this.scene)
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    })
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra
    const x = this.plane.position.x
    const H = this.viewport.width / 2

    // Vertical alignment offset so cards and labels are balanced around Y=0
    const yShift = 0.8

    if (this.bend === 0) {
      this.plane.position.y = yShift
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)
      const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX))

      if (this.bend > 0) {
        this.plane.position.y = -arc + yShift
        this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(0.99, effectiveX / R))
      } else {
        this.plane.position.y = arc + yShift
        this.plane.rotation.z = Math.sign(x) * Math.asin(Math.min(0.99, effectiveX / R))
      }
    }

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2 + this.width
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen
    if (viewport) this.viewport = viewport

    // 5 visible cards on desktop, 3 on mobile
    const isMobile = (this.screen?.width || 900) < 640
    const visibleCards = isMobile ? 3.1 : 5.1

    const cardWidth = Math.min(this.viewport.width / visibleCards, 6.8)
    const cardHeight = cardWidth * 1.2

    this.plane.scale.x = cardWidth
    this.plane.scale.y = cardHeight
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]

    // Update title mesh scale & position so it's never distorted on resize
    if (this.title) {
      this.title.updateScale(cardWidth, cardHeight)
    }

    // Tight gap between cards
    this.padding = cardWidth * 0.08
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

class App {
  container: HTMLElement
  scrollSpeed: number
  scroll: { ease: number; current: number; target: number; last: number; position?: number }
  onCheckDebounce: any
  renderer: any
  gl: any
  camera: any
  scene: any
  planeGeometry: any
  medias: Media[] = []
  mediasImages: { image: string; text: string }[] = []
  screen: any
  viewport: any
  raf = 0
  boundFns: any = {}
  isDown = false
  start = 0

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 2.2,
      textColor = "#f6f6f6",
      borderRadius = 0.06,
      font = "500 22px Roboto, sans-serif",
      scrollSpeed = 2,
      scrollEase = 0.05,
    }: any
  ) {
    this.container = container
    this.scrollSpeed = scrollSpeed
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200)
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, bend, textColor, borderRadius, font)
    this.update()
    this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.max(window.devicePixelRatio || 1, 2),
    })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.renderer.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 1,
      widthSegments: 1,
    })
  }

  createMedias(items: any, bend: number, textColor: string, borderRadius: number, font: string) {
    const defaultItems = [
      { image: "https://picsum.photos/seed/21/800/1000?grayscale", text: "Coastline" },
      { image: "https://picsum.photos/seed/12/800/1000?grayscale", text: "Palm Trees" },
      { image: "https://picsum.photos/seed/1/800/1000?grayscale", text: "Bridge" },
      { image: "https://picsum.photos/seed/2/800/1000?grayscale", text: "Desk Setup" },
      { image: "https://picsum.photos/seed/3/800/1000?grayscale", text: "Waterfall" },
      { image: "https://picsum.photos/seed/16/800/1000?grayscale", text: "Train Track" },
      { image: "https://picsum.photos/seed/17/800/1000?grayscale", text: "Santorini" },
      { image: "https://picsum.photos/seed/8/800/1000?grayscale", text: "Architecture" },
    ]
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      })
    })
  }

  onTouchDown(e: any) {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = e.touches ? e.touches[0].clientX : e.clientX
  }

  onTouchMove(e: any) {
    if (!this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * (this.scrollSpeed * 0.025)
    this.scroll.target = (this.scroll.position ?? 0) + distance
  }

  onTouchUp() {
    this.isDown = false
    this.onCheck()
  }

  onWheel(e: any) {
    const d = e.deltaY || e.wheelDelta || e.detail
    this.scroll.target += (d && d > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2
    this.onCheckDebounce()
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const w = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / w)
    const item = w * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    }
    this.renderer.dpr = Math.max(window.devicePixelRatio || 1, 2)
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }))
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const direction = this.scroll.current > this.scroll.last ? "right" : "left"
    if (this.medias) {
      this.medias.forEach((m) => m.update(this.scroll, direction))
    }
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    this.boundFns = {
      resize: this.onResize.bind(this),
      wheel: this.onWheel.bind(this),
      down: this.onTouchDown.bind(this),
      move: this.onTouchMove.bind(this),
      up: this.onTouchUp.bind(this),
    }
    window.addEventListener("resize", this.boundFns.resize)
    window.addEventListener("wheel", this.boundFns.wheel, { passive: true })
    window.addEventListener("mousedown", this.boundFns.down)
    window.addEventListener("mousemove", this.boundFns.move)
    window.addEventListener("mouseup", this.boundFns.up)
    window.addEventListener("touchstart", this.boundFns.down, { passive: true })
    window.addEventListener("touchmove", this.boundFns.move, { passive: true })
    window.addEventListener("touchend", this.boundFns.up)
  }

  updateTextColor(color: string) {
    if (this.medias) {
      this.medias.forEach((m) => m.title?.updateTextColor(color))
    }
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener("resize", this.boundFns.resize)
    window.removeEventListener("wheel", this.boundFns.wheel)
    window.removeEventListener("mousedown", this.boundFns.down)
    window.removeEventListener("mousemove", this.boundFns.move)
    window.removeEventListener("mouseup", this.boundFns.up)
    window.removeEventListener("touchstart", this.boundFns.down)
    window.removeEventListener("touchmove", this.boundFns.move)
    window.removeEventListener("touchend", this.boundFns.up)
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

onMounted(() => {
  if (!containerRef.value) return
  isMounted = true
  app = new App(containerRef.value, {
    items: props.items,
    bend: props.bend,
    textColor: props.textColor,
    borderRadius: props.borderRadius,
    font: props.font,
    scrollSpeed: props.scrollSpeed,
    scrollEase: props.scrollEase,
  })
})

onUnmounted(() => {
  isMounted = false
  if (app) {
    app.destroy()
    app = null
  }
})

watch(
  () => props.textColor,
  (newColor) => {
    if (app && newColor) {
      app.updateTextColor(newColor)
    }
  }
)

watch(
  () => props.items,
  (newItems) => {
    if (app) {
      app.destroy()
      app = null
    }
    if (!containerRef.value || !isMounted) return
    app = new App(containerRef.value, {
      items: newItems,
      bend: props.bend,
      textColor: props.textColor,
      borderRadius: props.borderRadius,
      font: props.font,
      scrollSpeed: props.scrollSpeed,
      scrollEase: props.scrollEase,
    })
  },
  { deep: true }
)
</script>

<style scoped>
.circular-gallery-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
  user-select: none;
}
.circular-gallery-container:active {
  cursor: grabbing;
}
</style>
