---
title: SOLID - Dependency Inversion
tags:
---


Up until now I had always thought the D in SOLID was for Dependency Injection - that components should depend on abstractions. This made perfect sense, I could swap out implementations if things changed - awesome. So I was pulling interfaces off concrete classes so that other components could depend on them and everything was working great. 
But it wasn't until I actually had to put this into practice or a large scale that this wasn't quite true... This was part of a project where we had implemented a temporary Entity Framework data store as a first iteration with the intention of swapping it with a full blown CRM implementation in the future. At the time we chucked everything behind a layer of interfaces and thought we were good as gold, we can swap the implementations out later, easy. 
Unfortunately the interfaces were actually so tightly coupled to the implementations that changing it meant the interface had to change as well, which caused changes to ripple up into the application layer. With the Application layer also depending on the Data layer we also had several instances where Entity Framework models has leaked up beyond the data layer, simply because they were easily accessible. Suddenly we had a massive refactoring job on our hands.

Something was clearly off here so I went back to the drawing board. The final piece of this puzzle for me was the realisation that it was Dependency *Inversion*.  

> A. High-level modules should not depend on low-level modules. Both should depend on abstractions.
> B. **Abstractions should not depend on details. Details should depend on abstractions.**

The second part of this principle was the big eureka moment for me - this was the **Inversion** I was missing. My interfaces were being extracted off the implementation (That's to Resharper's "extract interface" method, this was often far too easy!). But this meant the interface was dependent on the implementation detail, essentially tightly coupling the two.

When I stepped back and thought about it some more it made perfect sense. The higher level component doesnt *care* what lower level implementations are used. It should just be able to declare a contract, rely on someone else to figure out the detail, and move on with doing what it does best. 

The big change here was instead of the application layers depending on the data access layer, it was actually the other way around. The data access layer actually depends on the application layer. A couple of things need to happen for this to work out: 
 - The application layer defines the interfaces and behaviours it requires.
 - The application layer defines DTOs to represent the data it requires. 
 - The data layer references and implements any interfaces it can.
 - The data layer maps data objects to the DTOs defined in the application layer.
 - Everything is wired up in your IoC container.  

This has a couple of massive advantages:
 - Your application becomes completely independent of infrastructure concerns.
 - It's now impossible for data objects to leak into the application layer.
 - It's super easy to mock out these dependencies (eg for tests or demo data).
 - Because of this you can easily run automated tests over all your application logic. 
