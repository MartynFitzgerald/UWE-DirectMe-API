# DirectMe - Application Programming Interface (API)

The focus behind this final year computing project is to make parking easier, and dynamic for the user. The idea works by using the external data that will be displayed in our application programming interface (API) which will be combined with the user’s information that has been specified previously in the application. This information will then be inserted into an algorithm that will determine what is the best location to park their vehicle within a radius of the postcode, geo-location, or street name given.

This component...

## Editors
* Martyn Fitzgerald - 16025948

## Finite State Diagram

This is a diagram that shows how the system shall be used.

<div align="center">
![Finite State Diagram PNG](Finite State Diagram.jpeg)
</div>

<hr>

## Software Used

* Node.js
* Visual Studio Code
* Lucidchart
* Amazon Web Services (AWS)

## Setup Enviroment (Windows/Cloud Services)

1. Install Git (https://gitforwindows.org/).
2. Install Node.js 12+ LTS (https://nodejs.org/en/download/).
3. Create a AWS account, if one does't already exist.

## Installation

1. Open Command Prompt.
2. Clone the git repository to your computer's workspace.
```bash
git clone https://gitlab.uwe.ac.uk/m4-fitzgerald/Parking-Application-API-Prototype.git
```
3. Move into the folder of the reporsitory.
```bash
cd Parking-Application-API-Prototype
```
4. Install all dependencies.
```bash
npm install
```
5. Zip all internal files within the folder Parking-Application-API-Prototype. Note: Dont just do the main folder, make sure you highlight all of the files inside! 
6. Sign into AWS Management Console. 
7. Open the 'Services' Menu and then select the service 'Elastic Beanstalk' under the sub menu of 'Compute'.
![AWS 1](./installation_screenshots/aws1.png)
8. Select option 'Create a new environment'.
9. Afterwards it will ask what type of tier the enviroment will be, select 'Web server environment'.
10. Fill in the name of the application and under the section 'Application code', select 'Upload your code' and choose the zip file created previously. 
11. Create the environment. 
12. In the enviroment 
