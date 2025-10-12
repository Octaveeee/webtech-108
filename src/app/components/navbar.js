import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: '#eee' }}>
      <Link href="/">Home</Link> |{' '}
      <Link href="/about">About</Link> |{' '}
      <Link href="/contacts">Contacts</Link> |{' '}
      <Link href="/articles">Articles</Link>
    </nav>
  )
}
