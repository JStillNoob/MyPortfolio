export interface CertificateImage {
  src: string
  alt: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  dateEarned: string
  image: CertificateImage | null
  verificationUrl: string | null
}

// TODO: Replace each null image and verificationUrl with an authentic asset or URL.
// Keeping missing values explicit prevents the gallery from presenting placeholder
// artwork or non-working links as verified credentials.
export const certifications: Certification[] = [
  {
    id: 'meta-full-stack-developer',
    title: 'Information Technology Specialist - Databases',
    issuer: 'Certiport',
    dateEarned: '2025',
    image: {
              src: '/public/C3.png',
              alt: 'Information Technology Specialist - Databases',
            },
    verificationUrl: 'https://www.credly.com/badges/3db4c209-025f-4b0b-b5da-103c6a5e4487/public_url',
  },
  {
    id: 'responsive-web-design',
    title: 'Information Technology Specialist - Cybersecurity',
    issuer: 'Certiport',
    dateEarned: '2026',
    image: {
              src: '/public/C5.png',
              alt: 'Information Technology Specialist - Cybersecurity',
            },
    verificationUrl: "https://www.credly.com/badges/0aebe8b5-35db-4356-968c-77e5bd920d65/public_url",
  },
  {
    id: 'javascript-algorithms-data-structures',
    title: 'Information Technology Specialist - Networking',
    issuer: 'Certiport',
    dateEarned: '2025',
    image: {
              src: '/public/C1.png',
              alt: 'Information Technology Specialist - Networking',
            },
    verificationUrl: 'https://www.credly.com/badges/382e731a-6d49-4cee-999c-7878b9437e7f/public_url',
  },
  {
    id: 'foundations-user-experience-design',
    title: 'Information Technology Specialist - Network Security',
    issuer: 'Certiport',
    dateEarned: '2026',
    image: {
      src: '/public/C2.png',
      alt: 'Information Technology Specialist - Network Security',
    },
    verificationUrl: 'https://www.credly.com/badges/86d7ff3b-c924-46ca-b4ea-874c2f06d28c/public_url',
  },
  {
  id: 'unique-certificate-id',
  title: 'Information Technology Specialist - HTML & CSS',
  issuer: 'Certiport',
  dateEarned: '2025',
  image: {
    src: '/public/C4.png',
    alt: 'Information Technology Specialist - HTML & CSS',
  },
  verificationUrl: 'https://www.credly.com/badges/30dfb7d1-8ee0-49cf-824e-46df6dcc074d/public_url',
},
]
