import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { any } from 'zod'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>()

app.use('*', cors({
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))
app.options('*', (c) => {
  return c.text('', 204)
})

app.get('/Questions', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  try {
    const questions = await prisma.questionnaire.findMany({
      take: 10, // Limit to 10 questions
    });
    return c.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return c.json({ error: 'Failed to retrieve questions' }, 500);
  }
});

app.post('/post/Questions', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json(); // Parse request body as JSON
  
    // Validate data (optional)
    // ... validation logic to ensure required fields etc.

    const newQuestion = await prisma.questionnaire.create({
      data:  {

        questionText: body.questionText,
        options: body.options,
        answer: body.answer,
        
        // Assuming "questionText" field in schema
        // Add other fields based on your schema
      },
    });
    
    return c.json({ id: newQuestion.id_question }); // Return newly created question ID
  } catch (error) {
    console.error('Error creating question:', error);
    return c.json({ error: 'Failed to create question' }, 500);
  }
});



app.get('/Blogs', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  // const page = parseInt(c.query.page) || 1; // Default to page 1 if not specified
  // const pageSize = 10; // Number of items per page
  // const skip = (page - 1) * pageSize;

  try {
    const Blogs = await prisma.blogs.findMany({
      take: 10, // Limit to 10 Blogs
      // skip: skip
    });
    return c.json(Blogs);
  } catch (error) {
    console.error('Error fetching Blogs:', error);
    return c.json({ error: 'Failed to retrieve Blogs' }, 500);
  }
});

app.get('/Blogs/:id_Blogs', async (c) => {
  const id_Blogs = c.req.param("id_Blogs")
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  try {
    const Blog = await prisma.blogs.findFirst({
      where :{
        id_Blogs : Number(id_Blogs)
      },
    });
    return c.json(Blog);
  } catch (error) {
    console.error('Error fetching Blog:', error);
    return c.json({ error: 'Failed to retrieve Blog' }, 500);
  }
});


app.post('/post/Blogs', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json(); // Parse request body as JSON


    const newQuestion = await prisma.blogs.create({
      data:  {

        title: body.title,
        content: body.content,

      },
    });
    
    return c.json({ id: newQuestion.id_Blogs }); // Return newly created Blog ID
  } catch (error) {
    console.error('Error creating Blog:', error);
    return c.json({ error: 'Failed to create Blog' }, 500);
  }
});



app.post('/ContactUs', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json(); // Parse request body as JSON
  

    const newQuery = await prisma.contact_us.create({
      data:  {

        email: body.email,
        subject: body.subject,
        content: body.content,

      },
    });
    
    return c.json({ id: newQuery.id_contact_us }); // Return newly created Query ID
  } catch (error) {
    console.error('Error creating sending', error);
    return c.json({ error: 'Failed to send the query' }, 500);
  }
});

app.post('/Reviews', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json(); // Parse request body as JSON
  

    const newQuery = await prisma.reviews.create({
      data:  {

        name: body.name,
        description: body.description,
        rating: body.rating,

      },
    });
    
    return c.json({ id: newQuery.id_reviews }); // Return newly created Query ID
  } catch (error) {
    console.error('Error creating sending', error);
    return c.json({ error: 'Failed to send the query' }, 500);
  }
});

export default app