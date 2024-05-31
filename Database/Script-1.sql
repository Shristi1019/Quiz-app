create table subjects (
  subject_id int primary key,
  subject_name varchar(50) not null unique
);
 

insert into subjects (subject_id, subject_name) 
values (100, 'HTML'),
       (200, 'CSS'),
       (300, 'Python'),
       (400, 'JavaScript');


create table quiz_data (
  ques_no serial primary key,
  subject_id int not null,
  question varchar(200) not null,
  option1 varchar(200) not null,
  option2 varchar(200) not null,
  option3 varchar(200) not null,
  option4 varchar(200) not null,
  correct_option varchar(200) not null,
  foreign key (subject_id) references subjects(subject_id)
);


insert into quiz_data (subject_id, question, option1, option2, option3, option4, correct_option)
values (100, 'What does HTML stand for?', 'Hyper Text Markup Language', 'Highly Textual Markup Language', 'Hyperlink and Text Markup Language','Hyperlink Text Manipulation Language','Hyper Text Markup Language'),
       (100, 'Which attribute is used to specify the URL of the image in the img tag?', 'url', 'href', 'src','link','src'),
       (100, 'Which attribute is used to specify the alternative text for an image?', 'title', 'alt', 'caption','description','alt'),
       (100, 'Which attribute is used to define the font size in HTML?', 'font-size', 'size', 'fontsize','font','font-size'),
       (200,'What does CSS stand for?','Cascading Style Sheets','Computer Style Sheets','Colorful Style Sheets','Creative Style Sheets','Cascading Style Sheets'),
       (200,'Which property is used to change the text color in CSS?','text-color','color','font-color','text-style','color'),
       (200,'Which property is used to set the background color in CSS?','bg-color','background-color','background','bgcolor','background-color'),
       (200,'Which property is used to make text bold in CSS?','text-style','font-weight','bold','text-bold','font-weight'),
       (300,'What is the correct syntax for a Python comment?','# This is a comment','// This is a comment','/* This is a comment */','-- This is a comment','# This is a comment'),
       (300,'Which data type is used to store a sequence of characters in Python?','int','char','string','float','string'),
       (300,'What is the output of the following code? \n print(5 > 2)','True','False','Error','None of the above','True'),
       (300,'Which loop is used to iterate over a sequence of elements in Python?','for loop','while loop','do-while loop','repeat loop','for loop'),
       (400,'What is JavaScript primarily used for?','Styling web pages','Creating database schemas','Developing web applications','Managing server operations','Developing web applications'),
       (400,'Which keyword is used to declare a variable in JavaScript?','var','let','const','declare','var'),
       (400,'What is the output of the following code? \n console.log(2 + "2");','4','22','Error','NaN','22'),
       (400,'Which event is triggered when a user clicks on an HTML element in JavaScript?','onhover','onchange','onclick','onsubmit','onclick');

      

create table users (
  id serial,
  username varchar(100),
  email varchar(100),
  password varchar(50),
  otp int
)

select * from users;
select * from quiz_data;


