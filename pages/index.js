import { promises as fs } from 'fs'
import path from 'path'

const Blog = ({posts}) => {
  return(
    <ul>
      {posts.map((post) => (
        <li key={1}>
          {JSON.stringify(post)}
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts/')
  const fileNames = await fs.readdir(postsDirectory)

  const posts = fileNames.map(async (fileName) => {
    console.log("current file is: ", fileName)

    const fileLocation = path.join(postsDirectory, fileName)
    const fileContent = await fs.readFile(fileLocation, 'utf8')

    console.log(`${fileName} content is: ${fileContent}`)
    return {
      fileLocation,
      content: fileContent
    }
  })

  return {
    props: {
      posts: await Promise.all(posts)
    }
  }
}

export default Blog