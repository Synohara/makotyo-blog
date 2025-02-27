import { Comments } from 'nextra-theme-blog'

export default function CommentsLayout({ children }) {
  return (
    <>
      {children}
      <Comments lang="en" appId="d9ce0540-e519-46f9-a0cf-085bf32de806" />
    </>
  )
}
