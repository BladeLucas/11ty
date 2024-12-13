# Documentation
## Eleventy Project
**Developed by:** Blade Lucas
-----
This website is the cumulative efforts of Assignments 1, 2 and 3 of the 
INFT3201 course. It is developed using 11ty and is connected with a
headless CMS called DeCap. It has also been connected to a mail service
using GridSend to manage emails. The project is hosted on Netlify with the
source code being available on GitHub.

## Detailed Breakdown
I will be providing a detailed breakdown of each page and its operations
here for future development and troubleshooting purposes. I will also outline
the functionality of the layout files and the information they contain.
-----

## Layout Files
**Base.njk**
The base.njk file contains the base layout for all the pages in the website.
It contains the CDN's for Bootstrap, Netlify and Font Awesome, as well as
the link to the CSS file. The layouts for the header and footer are also called 
within this file. The logic for the login button is also contained within the base
layout.

**header.njk**
The header.njk file is simply a file to contain the websites banner at the
moment, but may be expanded upon later.

**footer.njk**
The footer.njk file contains a simple href link to each page within the
website (excluding individual project links) and the copyrite. This may
also be expanded upon in the future.

**project.njk**  
The project.njk file is an extension of the base.njk file, nested within
the content section. It contains the formatting for each of the .md files
the project information is stored in.
-----

# SRC Pages
**index.njk**
The index.njk serves as a landing site for users arriving on the website.
It leverages the base.njk layout file to display its content and displays
several cards with some basic information, and a redirect button to the
various pages in the website. If more pages are added in the future, more
cards may be added. In the top card, the "Projects" and "Contact" buttons
are features (hard coded), this can be changed to be dynamic or more hard
coded buttons may be added.

**projects.njk**
The projects.njk file is the page where all of the projects I have worked
on are displayed. The project information is stored in individual .md 
files in the ./src/projects directory.This page also leverages the base.njk layout. 
This page creates a card for each of the projects, drawing the front matter from 
the collection "projects". This page is dynamically sized for a better user experience 
on mobile devices. The projects are sorted form newest to oldest by looking at the 
"semester" front matter of the individual projects and ordering them in the .eleventy.js 
file in order to make sure the int type is parsed properly.

**contact.njk**
The contact.njk file contains a form which when filled out and sent will
send me an email using SendGrid. This file leverages the base.njk layout.
When the submit button is pressed, the javascript will execute the 
serverless function contact.js, stored in the ./netlify/functions directory.
This is done by creating a JSON map and sending it to the function to 
parse. While the function is running, as requested in the project outline, 
an animated font awesome spinner displays. Upon receiving a success or 
failure response from the function, either a success message, or an error 
alert will be displayed to the user.

**about.njk**  
The about.njk file simple displays a card with some information about me. 
This file leverages the base.njk layout. All the information about me is
static.
-----

# Admin Files
These are all files contained within the ./src/admin directory and server
as connection points with the DeCap CMS.

**index.html**
This page is copied form the [DeCap](https://decapcms.org/docs/install-decap-cms/) 
install pages, and is a required document as of the last update to this
documentation.

**config.yml**  
The config.yml file configures the manner in which the headless CMS will
interact with github, as well as the directorys in the project. It also 
contains the format of the front matter for the project .md files stored 
within the ./src/projects directory, that way the cms has a reference for 
what fields are required to make a new entry.
-----

# Serverless Functions
All files are contained within the ./netlify/functions directory as long 
as the project is hosted on netlify. If the CMS were to be changed, a new 
folder determined by the new CMS would need to be created.

**contact.js**  
This serverless function handles the sending of emails to myself whenever 
someone fills out the contact form in the ./src/contact.njk page. It requires 
the dependnacy @sendgrid/mail, which needs to be kept up to date for 
proper functionality. The "from" field in the emailData needs to be a 
registered email address on the SendGrid account or the function will not 
work properly. The API key is stored in the environment variables on 
Netlify.
-----

# .eleventy.js  
The .eleventy.js file is the config for the 11ty project. It is fairly 
simple at the moment, some passthroughs are added to ensure that pages 
other than the index.njk files are accessable, and as mentioned before, 
there is a collection function which allows the ./src/projects.njk file 
to sort the .md files in ./src/projects directory by the semester from 
newest to oldest. This function is required as the front matter does not 
specify type, and in order to properly sort the projects, the semester 
front matter needs to be parsed as an integer.
-----

# Projects Directory
All these files are contained within the ./ser/projects directory.

**project-name.md**
The .md files in this directory represent my projects that I have worked 
on. The front matter in these documents is important as the project.njk 
layout requires many of these, and the contact.js serverless function 
prompts for all of them too. The "semester" variable is specifically 
important as that is the sorting variable for the ./ser/projects page, and
the variable needs to be an integer, so no quotes on this front matter 
variable.

**projects.json**  
This json file adds the project layout file and the projects tag as a 
required and automatic variable for each .md file in the ./src/projects 
directory. These can be assigned manually be removing them from the json 
file and adding them manually to each existing file and adding them to 
the ./src/admin/config.yml file as required fields from the CMS when creating 
new entries.
-----

# Additional Information
**Background image**
The background image is stored within the ./src/assets directory under the 
name background.jpg. Changing this image will change the background. The image 
is assigned in the ./src/style.css file.

**Netlify**
This project is hosted via Netlify, drawing from a private github directory. 
There are envirenment variables stored there that the website does use.

**Mobile Friendly**
I have done my best to make sure that every page is responsive to screen 
size, and should be completely mobile friendly. If not, use the contact page 
to let me know the issues.