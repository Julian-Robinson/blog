---
title: The 80% Architecture - Foundations
categories:
 - Software Development
 - The 80% Architecture
date: 2017-07-25 22:23:25
tags:
 - Architecture
 - Dependency Inversion
---


I end up starting a lot of new projects at work - one of the advantages (and perhaps disadvantages) of working for a professional services company. One really interesting part of this is the first weeks of a project where there's no existing source code and you've got the perfect chance to try something new - learning from what's worked well historically and more importantly, what didn't.
This post is the first of hopefully many that describe my approach to setting up the initial architecture of a solution and the technologies and frameworks that I'll look to use straight off the bat, regardless of what the detailed requirements might be. At work we've coined this **The 80% Architecture**.

<!-- More --> 

## Project Foundation

The most important part of any successful project is an architecture that is flexible and scaleable. Without these two characteristics every enhancement to the project ends up putting more pressure on the core framework, either requiring large amounts of refactoring or making a change unnecessarily difficult and expensive. You cant realistically predict where a project might go so you need to avoid hamstringing yourself early at all costs.

I've found I've had the most success with an architecture pattern similar to the [Hexagonal](http://alistair.cockburn.us/Hexagonal+architecture) or [Onion](http://jeffreypalermo.com/blog/the-onion-architecture-part-1/) architectures. 
The gist of these patterns is that your business logic, the code that is unique to the business and your domain becomes the  **core** of your application. All of your hosting, infrastructure and other major dependencies are pulled to the fringes with nothing depending on them. This is accomplished through heavy use of *abstraction* and *dependency inversion*.

The end result looks something like this: 
{% asset_img "architecture-diagram.png" "High Level Modules"%}

### Application
Represents your core application and domain code that makes up your core business logic. Your application exposes functionality through **Application Services**. Dependencies are abstracted behind **Interfaces** and any data in or out of your application is represented through simple **DTOs**. If you're following techniques talked about in Domain Driven Design then this module can also include your *bounded contexts* as well.  

### Dependencies
Include things like databases, web services, notification services, file system access. Pretty much any component or third party library that you might depend on but dont have full control over. These are all abstracted behind interface definitions and they must implement behaviour *required and defined by your application*. All of these dependencies can easily be replaced by stubs or mocks for testing and development. 

### Application Hosts
Tasked with hosting your application services. This could be a console app, ASP.NET website, UWP application, whatever. The point is that these components should focus on responsibilites unique to the platform and then call through to your core application services. These responsibilities include any setup and configuration requirements, as well as mapping to view models for frontend applications. I'm a huge fan of *inversion of control* and this pattern relies heavily on it so a major task of this module is act as your *composition root* and wire up all of your implementations to their appropriate interfaces using your IoC framework of choice. 

### Automated Tests
Represent your test libraries.This allows your tests to focus on your *core application logic* independent of the dependencies and hosting details mentioned above. Because your dependencies typicaly dont reference anything else you can easily create test projects to testing these modules.

### Cross Cutting
Simply represents those concerns that can span across your entire application. Authentication, logging, exception handling, constants and utility methods etc.

## Typical Data Flow
If we stick with the overused example of an app that displays a list of movies the typical data flow through the application would look something like this:  
1. The user clicks the **Load Movies** button on the *View* - bound to the **LoadMoviesCommand** property on the *View Model*
1. The *View Model* depends on a **MovieManager** *Application Service*. The command passes the necessary parameters to the application service method **GetMovieList**. 
1. The *Application Service* depends on an **IMovieReader**. This interface defines a **GetMovies** method returning a list of **MovieDTOs**. It doesnt know (or care) where movies are read from, so long as it returns some movies. 
1. The **MovieDBRepository** implements the **IMovieReader** interface - reading the list of movies from the database and returning them as **MovieDTOs**
1. The MovieDTOs are returned back through the application to the **View Model** - where they are transformed to **MovieItemViewModels** to be displayed.

{% asset_img "uml.png" "First UML I've done for awhile!" %}

Now this example looks overkill (and it is, because the problem is relatively simple) but the trick is that in each module we have components that focus on **exactly** what they need to do. The ViewModels focus on the properties that are being displayed to the user. The MovieDTO is purely for transferring data between modules and could be made up of data that's persisted in multiple locations (for example the movie's rating could be sourced from IMDB). Also, by forcing out data access modules to return DTOs defined in the application module we avoid taking hard dependencies on things like Entity Framework so we can swap these out at any time much easier. Remember - we're focusing on flexibility here - and this setup allows us to easily change how things are implemented, often without changing method signatures.

So there are some big advantages with an architecture like this - but unfortunately nothing in life is free and it does come with some draw backs... 

### Advantages

 - Your core application becomes completely independent of infrastructure concerns and can be easily hosted in a variety of ways.
 - It's impossible for data objects to leak into the application layer, everything must conform to your applications DTOs
 - It's super easy to mock, stub or swap out dependencies/implementations (eg for tests or demo data).
 - Because of this you can easily run automated tests over all your application logic. 

### Disadvantages
- Increased Complexity: It takes new developers a little while longer to *really* get their heads around this approach. Only really a problem early in the process or if teams are changing a lot (which is a whole other issue).
- More Indirection: The application code ends up defining a lot of interfaces and the implementations associated with these are set up in your composition root, or even at runtime. It can sometimes be tricky at first to determine what is actually being called.
- Increased Data Mapping: With data passing from data models to DTOs to View Models and back there's a lot of data mapping. Using a framework like AutoMapper can help with this if you find it tedious but I typically end up just doing it manually. The layers are nicely isolated in that writing a mapping function and a test doesnt take too long.
- Lower Performance: With additional layers of indirection and a lot of mapping going on there can be a performance hit - especially if you're dealing with a lot of data. While I dont think it's ever something that falls into the unacceptable category it's worth pointing out that if you're looking to squeeze out every nanosecond then this probably isn't the best approach. 

## Closing thoughts

In my opinion the pros outweigh the cons here - yes, it is more complex, but this is a one time cost - once a new dev has their head around the setup they're good to do. Performance issues are often caused by trying to do too much and can often be resolve by rethinking what you're doing.
The flexibility benefits though, they live throughout the life of the application. Instead of being nervous about what kind of major potential changes could crop up this pattern means the process for adding these is always the same, allowing for a architecture that can evolve and grow over time. This kind of flexibility early in a project when it's impossible to really know where it's going to go is essential, nevermind when you come back to swap out your Entity Framework database to use Dynamics CRM as a data store in 3-4 years time! 

If you're reading this I'd love to hear your thoughts. Any suggestions? Maybe you've used a similar pattern before yourself? How did it turn out? Leave a comment below and let me know.

Next post on this topic will hopefully be where I describe my go-to frameworks for a new project - So keep an eye out for that one too. 
