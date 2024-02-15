
# Movie Data Visualization Project

This project is a movie data visualization web application built with React.js. It utilizes data fetched from MongoDB to display various charts and information about movies, including genre popularity, movies released in each decade, and more.


## Features

- **Genre Popularity Chart:** Visualizes the popularity of different movie genres.
- **Decade Movies Chart:** Displays the number of movies released in each decade.
- **Language Distribution Chart:** Shows the distribution of movies by original language.
- **Movies Page:** Allows users to filter and search for movies based on various criteria such as year, rating, language, and genre. Pagination is implemented using Material-UI.


## Tech Stack

**Client:** React.js, Redux,React Router DOM, React Hook Form, Material-UI, Chart.js, TailwindCSS

**Server:** Node, Express, MongoDB


## Getting Started

**Clone the repository**  
[git clone https://github.com/your-username/movie-data-visualization.git](https://github.com/bharathvaddineni/movie-data-visualization.git)  
**Install dependencies**  
cd movie-data-visualization/Client 
npm install  
cd ../Server  
npm install  
**Run the development server**  
cd ../Client   
npm run dev  

cd ../Server  
nodemon  

Open http://localhost:5173 in your browser to view the application  



## Screenshots

Home Page: 
![Screenshot (107)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/7e2cfc3a-eaf3-4985-9077-9054bc77a3bb)  
When hoverd on to pie chart(Movies displayed by popularity each year)
![Screenshot (108)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/fee9a884-c095-44e6-9699-203b83eca335)  

And clicked on the family genre, it opens a page with Family genre movies in all years
![Screenshot (109)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/f2a5ebf5-4295-4970-8604-388ffe3ac601)  

Pagination in the movies page realted to a genre
![Screenshot (110)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/da88814f-f1a3-4809-a2dc-5a48c90cf341)  

Going back to home page by clicking the "Home" button and hovered on the bar chart(Movies displayed by the decades)
![Screenshot (111)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/25b0709a-ea3f-48fe-8019-4c0d1b05a08d)  

There are 58 moveis for the decade 2000-2009 and when clicked on the bar a page opens with all the movies in that decade  
![Screenshot (112)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/6de4c88c-abd1-45f1-8dfb-c83b35f5cd90)  

Pagination in this page  
![Screenshot (113)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/e98b4c50-6a85-4963-815e-c17ba4faf2e5)  

Again going back home, hovered on the doughnut chart(Movies displayed by language)
![Screenshot (114)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/88b1115a-e09d-433d-8865-510c087b9445)

When clicked on the Japanese('ja') part, it opens a page with all the Japanese movies  
![Screenshot (115)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/cd8375cc-c9e7-4d06-bf7c-fbf530bde2f4)  

Pagination in this page  
![Screenshot (116)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/66243b15-3dbf-4e18-848a-c5a8d36c4e23)


Now going to the Movies page that displays all the movies with various filter options
![Screenshot (117)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/59a303a6-e1f2-4562-b2fa-ea22772c35ef)

All the filters work as we change the values. All movies released in the year 2021  
![Screenshot (118)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/49026065-ac3b-4afe-9913-03607afb5991)

All movies with the rating greater than 8  
![Screenshot (119)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/5b2e25b7-faff-48c1-bdfc-295aef97c2ba)  

All Japanese movies  
![Screenshot (120)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/afe762d8-3123-43ab-8f4a-f58e45ab9225)  

All fantasy moveis  
![Screenshot (121)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/cc8effc3-cb31-4ab8-9f18-34c6b408483c)

All English Animation movies realesed in the year 2019
![Screenshot (122)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/4a637e4a-e19e-46a2-8fc5-1cccd103a3a0)  

All Toy story movies  
![Screenshot (123)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/db4986b9-dae1-4881-9c53-0ee1f19a6544)  

Contact form  
Errors when submited with invalid data  
![Screenshot (124)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/0838d87a-6bc9-46e1-a030-5c97689583cc)  

![Screenshot (125)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/1b302361-a447-4fca-9013-3fe0b739bbc4)  

![Screenshot (126)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/810831d5-5c80-45d7-8b4a-ac64b9228931)  

![Screenshot (127)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/a3156f9a-c244-4703-b6d0-29efa89a7f56)  

![Screenshot (128)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/fbda4d35-de8e-491d-b513-6327f9e7ca68)  

When entered the valid data ad submitted, it logs a message in the console  
![Screenshot (129)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/e5290746-6c0b-420c-8b9b-f5f3dee4c123)  

![Screenshot (130)](https://github.com/bharathvaddineni/movie-data-visualization/assets/63656325/8a443889-abd8-4870-80f5-6187b595c21b)




## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
 - [Acquired data from Kaggle](https://www.kaggle.com/datasets/asaniczka/52000-animation-movie-details-dataset-2024)
  - [Chart.js documentation](https://www.chartjs.org/docs/latest/)  
   - [React documentation](https://react.dev/learn) 
   - [Material UI pagination documentation](https://mui.com/material-ui/react-pagination/)  


