---
title: The 80% Architecture - Foundations
tags: 
categories: 
 - Software Development
---

I end up starting a lot of new projects at work - one of the advantages (and perhaps disadvantages) of working for a professional services company. One really interesting part of this is the first weeks of a project where there's no existing source code and you've got the perfect chance to try something new - learning from what's worked well historically and more importantly, what didn't.
This post is the first of hopefully many that describe my approach to setting up the initial architecture of a solution and the technologies and frameworks that I'll look to use straight off the bat, regardless of what the detailed requirements might be. At work we've coined this the **80% Architecture**.

<!-- More --> 

## Base Architecture

The most important part of any successful project is an architecture that is flexible and scaleable. Without these two characteristics every enhancement to the project ends up putting more pressure on the core framework, either requiring large amounts of refactoring or making a change unnecessarily difficult and expensive.

I've found the I've had the most success with an architecture pattern similar to the [Hexagonal](http://alistair.cockburn.us/Hexagonal+architecture) and [Onion](http://jeffreypalermo.com/blog/the-onion-architecture-part-1/) architectures. 
The gist of these patterns is that your business logic, the code that is unique to the business and your domain becomes the  **core** of your application. All of your hosting, infrastructure and other major dependencies are pushed to the fringes with nothing depending on them. This is accomplished through heavy use of *abstraction* and *dependency inversion*.

The end result looks something like this: 
{% asset_img "architecture-diagram.png" %}

**Application** represents your core application and domain code that makes up your core business logic. Your application exposes functionality through **Application Services**. Dependencies are abstracted behind **Interfaces** and any data in or out of your application is represented through simple DTOs. If you're following techniques from Domain Driven Design then this area can include all of your domain objects as well.  
**Dependencies** include things like databases, web services, notification services, file system access. Pretty much any component or third party library that you depend on but dont have full control over. These are all hidden behind interface definitions and they must implement behaviour *required and defined by your application*. All of these dependencies can easily be replaced by stubs or mocks for testing and development. 
**Application Hosts** represent where your application runs. This could be a console app, ASP.NET site, UWP application, whatever. The point is that these frontend  components should just call through to your core application services. I'm a huge fan of Inversion of Control and this pattern relies heavily on it. The other responsibility of your application host is to actually wire up all of your implementations to their appropriate interfaces using your IoC framework of choice. 
**Automated Tests** represent your test libraries.This allows your tests to focus on your *core application logic* independent of the dependencies and hosting details mentioned above. 
**Cross Cutting** simply represents those concerns that can span across your entire application. Authentication, logging, exception handling, constants and utility methods etc.

### Advantages

This pattern has a couple of massive advantages:
 - Your core application becomes completely independent of infrastructure concerns.
 - It's impossible for data objects to leak into the application layer, everything must conform to your applications DTOs
 - It's super easy to mock, stub or swap out dependencies/implementations (eg for tests or demo data).
 - Because of this you can easily run automated tests over all your application logic. 

The flexibility is the reason this is my go-to approach. Instead of being nervous about what kind of major potential changes could crop up this architectural pattern means the process for adding these is always the same allowing for a architecture that can evolve and grow over time. This kind of flexibility early in a project when it's impossible to really know where it's going to go is essential. 

### Disadvantages

Unfortunately nothing in life is free and I've found there's definitely a few draw backs of an architecture like this. 
- Complexity.
- Indirection
- A lot of data mapping
