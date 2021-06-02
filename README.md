# Assignment: Instagram Prototype
## Scope of Work
Your team need to design a mobile based social media that allow people to do the
following:

**Upload pictures**

Your users should be able to upload pictures to your app. To save bandwidth,thumbnails with appropriate sizes will be generated for each of the uploaded pictures.

**Follow friends**

The users are able to search for other users based on some identifier (user id, phone number, email or something). You can decide what kind of search function you want
to provide for your application.

**Get feeds on their friends activity**

When a user posted a picture, the picture will appear in their followers feed within a short period of time. You should try to design the system to minimize the time lag
from the time a picture is posted to the time it appears in the feed. To save bandwidth, the feed may use the thumbnails and only show the original pictures
when really necessary, assuming that users may upload large pictures.

**Like a picture**

Users can indicate that they like a picture and they can also cancel their like (unlike)


## Technical Constraints
1. You need to design your application following cloud native architecture
2. You need to utilize cloud services of the following nature:
a. Web application deployment e.g. AWS Beanstalk
b. Microservice preferably using serverless services e.g. AWS Lambda
c. Object storage e.g. AWS S3
d. Database (RDBMS or NoSQL) e.g. AWS RDS or DynamoDB
e. Data visualization e.g. AWS Quicksight
f. Machine learning e.g. Amazon Rekognition or Amazon Comprehend

3. You are not restricted only to use AWS services, but you still need to follow the nature of cloud service used. E.g. you can use Google Cloud Storage instead of AWS
S3, but you still need to have object storage in your implementation. You are encouraged to use other cloud services that add value to the your system e.g. system monitoring, pub/sub architecture, API gateway
4. You need to practice DevOps for the development of this system. Configurations andcodes need to be managed in configuration management. Build and deployment



## React-Native-Mobile-App

This assessment seeks to explore the use of developing a system using a cloud native architecture. Our team attempts to use and apply as many cloud services provided by AWS
as possible. In the process of developing the application, our team hopes to build a robust application that is scalable, resilient, low maintenance and cost effective.



## Overall design architecture
The diagram below shows the high level overview of the system architecture.

![Image](/images/architecture.png)
Our program will communicate various services through an application programming interface (APIs). The API is written in languages such as Java and .Net, deployed inside
Elastic Beanstalk. From a high level perspective, our application would communicate everything through an API gateway.

The table below shows the list of AWS services that we use in our application:

| Services Uses      | Purposes                                                                                                                                                                                                                                                                        |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Elastic BeanStalk  | Deploy our codes and it will help us manage capacity provisioning, load balancing, scaling, and application health monitoring. It is especially useful for codes that are unable to run in server-less environments such as Neo4j and traditional Java and ASP.Net application. |
| S3                 | S3 is chosen because of its high durability and low cost characteristic. At the same time, we do not need to worry about the growth of the files that is being upload as we can have up to 5 TB of files being store.                                                           |
| Lambda             | Lambda is a server-less compute service that we use to run our code. It allows our program to execute code inside our app without the complexity of building and maintaining the infrastructure.                                                                                |
| Amazon Rekognition | An artificial intelligence service provided by Amazon. This feature can help us identify pictures uploaded through object detection and facial recognition.                                                                                                                     |
| Auto scaling       | Helps to monitor our application and automatically adjusts capacity to maintain steady and predictable performances.                                                                                                                                                            |
| CloudFront         | A service that helps to speed up our web content as our codes are deployed in US region. Users that use our application will be routed to the edge location that provides the lowest latency time.                                                                              |
| Cognito            | A service in AWS that helps to manage user account and access control of our application. It provides a secure user directory that scales to hundreds of millions of users                                                                                                      |


## Microservices
Our overall system consist of 6 microservices. All the services are show in the diagram below.
![Image](/images/microservices.png)

### USER MANAGEMENT
Amazon Cognito User Pool provides a secure user directory that scales to hundreds of millions of users. It has many benefits that we can make use of inside our system such as
standard base authentication, security, access control to the backend resources and it is easy to integrate into our application.

### IMAGE MANAGEMENT
The image management allows user to be able to upload and view photos uploaded by themselves or their friends. The image management consists of micro-services such as
“upload image micro-service”, “get image listing micro-service” and “image recognition AWS service”. Image below illustrates the architecture of how the micro-service is
developed for the image management. 

###  FRIEND
Friend services allow users to add/follow friends. Username of the account would act as an identifier. These services are written in ASP.NET. The codes are deployed inside AWS
Elastic Beanstalk. Interaction with the service would be done through API. Relationship micro services is encapsulated inside these services. The search would return
common friends and friend of friends. It is achieved using Neo4J, graph database management system where is allows nodes and relationships of users to be display in an
efficient manners. Diagram below shows the overview of Friends and relationship management architecture:

### LIKE MANAGEMENT
The like’s management allows users to interact with the image by liking or un-liking the image.

### IMAGE RECOGNITION
We use the Amazon Rekognition, a cloud machine learning services provided by AWS. It provides many benefits such as is easy to integrate into our application through API call,
and it is continually learning through new data. By leveraging these benefits, it allows our apps to identify images that are being uploaded and assigns a label based on what the
services infer.

### DASHBOARD SERVICES
There are two dashboards designed for the system with different target user, End users and Admin. The metrics are displayed in real-time. As long as the dashboard page is refreshed,
the users will be able to see the most up to date information

## USER INTERFACE
![Image](/images/ui0.png)
![Image](/images/ui1.png)
![Image](/images/ui2.png)

## Conclusion
This report has explored and applied various types of services provide by AWS. Despite the steep learning curve, our team has managed to build a mobile based social media app that
allows people to upload and share images with their friends.

Developing in the cloud enables us to get our application to market quickly. Cloud computing uses remote resources, saving the hassle of buying the servers and other
equipment.

Through this assignment, our team has a clearer understanding on the state of current cloud technology. It has many benefits that it provides to it users and businesses. At the end of
the day, cloud computing has changed the landscape of software development and has a great impact on the world.

## Note
This repository contains the frontend code only. 
