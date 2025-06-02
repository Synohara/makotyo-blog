import { Comments } from 'nextra-theme-blog'
import AdSenseUnit from '../../components/AdSenseUnit'

export default function CommentsLayout({ children }) {
  return (
    <>
      {children}
      
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <AdSenseUnit 
          adSlot="4533042266"
          style={{ display: 'block', margin: '20px 0' }}
        />
      </div>
      
      <Comments lang="en" appId="d9ce0540-e519-46f9-a0cf-085bf32de806" />
    </>
  )
}
