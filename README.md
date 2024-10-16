![Thumbnail](https://github.com/mariacatiana/imagens/blob/7d670369ca5ee10b106af48d3b14191766b38a6b/Thumbnail%20Blogging%20Front-End.png)


# ✏️ Blogging Front-End - FIAP Tech Challenge

This project was developed as part of Challenge 3 of FIAP's Pós-Tech course, focusing on building the front-end interface of a blog application. The complete design prototype was created by me in Figma before the front-end implementation. Additionally, the application is connected to an API that I developed in Challenge 2 - Blogging API, creating a complete solution for managing blog posts.

## 📖 Table of Contents
1. [Features](#Features)
2. [Technologies Used](#Technologies)
3. [Project Overview](#Overview)
4. [Next Steps](#Next_steps)
5. [Contribuitions](#Contribuitions)
6. [About FIAP and Pós Tech](#Fiap)


## 🔨 Features 

The blog application includes the following features:

- **Display All Posts:** Users can view a list of available posts.
- **View Specific Post:** Users can access detailed content for a specific post.
- **Conditional Messages:** Messages such as "No posts available" or "Error loading posts" are properly displayed in scenarios of missing content or request failures.
- **Full Responsiveness:** The layout adapts to different screen sizes, including mobile, tablets, and desktops.
- **Modular Design:** Reusable components, such as the header and footer, facilitate maintenance and expansion of the application.
- **Pagination of Posts:** The functionality to load more posts as the user navigates is fully implemented.
- **Search by Keywords:** Users can search for posts by keywords using a search bar.

![Gif](https://github.com/mariacatiana/imagens/blob/6510d9926dbc1819ceeafc38109a828ba8deeab9/Gif%20Blogging%20Front-End.gif)

## 🛠️ Technologies Used

The project utilizes a modern stack to ensure a performant and maintainable application:

- `Next.js:`: Framework used for creating the interface and server-side rendering.
- `TypeScript:`: Provides static typing and ensures safer development.
- `Styled Components:`: For dynamic and modular styling, ensuring consistency with the Figma prototype.
- `Axios:`: Used for making HTTP requests to the posts API (which I built in Challenge 2).  

## 👀 Project Overview

This project started with the design of a complete prototype in Figma, where all the screens and interactions were planned with a focus on usability and responsiveness. After the prototype was ready, the front-end was developed using Next.js and TypeScript to ensure a scalable and modern application.

The application connects to the API developed in Challenge 2 - Blogging API, enabling dynamic post loading and a complete front-end and back-end integration. Dynamic routing was implemented using Next.js' App Router, with specific pages for each post's display.

How to run the project:

Clone the repository:

```bash
  git clone https://github.com/mariacatiana/blogging_web.git
```
Install the dependencies:

```bash
  npm install
```

Start the development server:

```bash
  npm run dev
```
Open the application in your browser at http://localhost:3000.

# 🔮 Next Steps

Here are the next steps planned for the project:

- Content Loading Optimization: Improve content loading performance, especially on mobile devices.
- Automated Testing: Add integration and unit tests to ensure code quality.

# 🤝 Contributions

Contributions are welcome! If you would like to suggest improvements, fix bugs, or add new features, feel free to open an issue or pull request. Let's build something amazing together!

# 🎓 About FIAP and Post-Tech

The ***Faculdade de Informática e Administração Paulista (FIAP)*** is a leading Brazilian higher education institution, specializing in information technology and business management. With a reputation for excellence, FIAP offers cutting-edge programs that prepare students for the challenges of the modern digital world.

**Post-tech** are postgraduate programs in various areas of technology. These are technical specialization courses for graduates (lato sensu) designed by experts, combining the best of **FIAP and Alura** – the largest tech education ecosystem in Brazil. This partnership brings together FIAP's strong academic foundation and Alura's innovative approach to online learning, providing students with a comprehensive and forward-thinking education.

This project is part of the Pós Tech curriculum, where students tackle real-world challenges and develop practical, high-impact solutions.

For more information, visit [FIAP: Pós Tech](https://postech.fiap.com.br/)
