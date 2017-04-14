---
title: Hello World! Starting a Blog with Hexo
tags:
  - Hexo
  - Blog
  - Static Site
category:
  - Blog
  - Hexo
description: Describes my experience using Hexo to implement my new blogging platform
date: 2017-04-10 22:17:47
---

With the popularity of static site generators and the simplicity and flexibility that these bring in regards to hosting I've finally decided to start a blog!
Read on for my experience getting a blog platform set up without worrying about hosting or security and paying as little as possible for an online presense but without the restrictions of using a blog service.
<!-- More --> 

The first decision was what generator to use.  While Jekyll is almost the de facto standard it requires a Ruby environment, which I don't typically use. I was after something similar that could run on a stack I was familiar with - for no other reason than it was one less thing to install on my machine. After evaluating several options I decided to give Hexo a go. 

## Setup

The setup process was a breeze. The [documentation](https://hexo.io/docs/setup.html) is simple and easy to follow and with only a few commands I had the Hexo platform up and running. The only prerequisite was having Node and Git installed.

First I installed the Hexo CLI. It's recommended to install this globally to allow Hexo command to be used anywhere.  
``` bash
$ npm install -g hexo-cli
```

Then created a Hexo project using the recently installed Hexo-CLI: 
``` bash
$ hexo init <folder>    # initialise hexo in a folder
$ cd <folder>           # change directory into the newly created folder
$ npm install           # restore npm packages
```

And really, that's it. From here I was pretty much ready to get into writing content!

But I had to dig a little deeper and see what was available within the platform. The out of the box theme (landscape) was a good example of what Hexo can do with several plugins and features already configured such as Disqus integration for comments, Google analytics and plugins for archives, categories and tag lists. All of these features are driven from the [config.yaml](https://hexo.io/docs/configuration.html) file so it was worth reviewing that to see what's on offer.

So the default theme had pretty much everything I was after right of the bat - it just didn't look great... 

## Themes

I spent a bit of time looking at some of the alternate themes but unfortunately none of them really clicked for me, and the ones that did didn't work when I tried to apply them.  

Instead I embarked on giving my blog a custom lick of paint, or bastardising the default theme... However you want to look at it. 

This was mostly just simple things like moving some elements around and adjusting the style sheets so nothing too exciting. I have to admit I was impressed with the minimal style of Stylus (the css preprocessor of choice for Hexo) but unfortunately the GitHub project looks a bit dead so I don't think I'll go so far as adopting it over SASS.
One useful tool I found while doing this was [Coolor](https://coolors.co/) - You can upload an image (in this case my banner image) and it spits out a colour scheme based on the colours in the image. Sweet!

The most beneficial part of this exercise was that digging through the theme in detail meant it gave me a better understanding of how everything hangs together. All the templates are written using EJS, which I hadn't seen before but reminds me of Razor in MVC. Overall it's pretty easy to pick up and use (it is just JavaScript in HTML after all).

The whole platform feels pretty nice to use, and is driven largely from your config files and post frontmatter. You can create arbitrary properties in either of these areas and they flow through and become available within any template for you to use, whether you want to render it out directly or use it to drive some behaviour.
A simple example of this was I decided I'd rather not have sharing enabled on every page - it was as easy as adding  "sharing:disabled" to the posts frontmatter and this property was then accessible from the post template where I could use it to control if the sharing button is visible.

There's still a couple of areas of black magic I'd still like to look into but I'm pretty happy with the result at this stage. 

## Writing Content

Creating content is also pretty straightforward. The simplest solution is to just drop your markdown files into the `\source\_posts` directory. 
The slicker way is to use Hexo's commands to create a new draft, and publish it when you've finished writing your article. Publishing adds the current date to the frontmatter and moves it out of your drafts folder so it's picked up when you generate your site. 

``` bash
hexo new draft <title> 
# ... write stuff! 
hexo publish post <title> 
```

Hexo includes two commands for reviewing your changes: 
``` bash
hexo generate     # builds your site - outputs to the public folder.

hexo server        # spins up a node server allowing you to browse your site locally. 
```

Hexo server also includes a watcher so the site is updated whenever you make changes. 

I found it useful to set the render_drafts flag in the config.yaml to true for development so that the above commands included all the draft posts, then using a separate config file for deployment that overrides this file to ensure drafts aren't deployed. 

One other tweak I made was to enable Hexo's [asset folders](https://hexo.io/docs/asset-folders.html). This means that each post gets created with an additional folder for assets (images etc) and makes for an easier job to reference these assets using relative file paths.

## Deployment

I opted to use GitHub Pages for hosting this blog, it's free so hard to justify anything else just yet. Hexo includes a deployment plugin specifically for writing to GitHub, so deployments are super easy.

Simply install the plugin with NPM:

``` bash
npm install hexo-deployer-git --save
```
..and add a few lines to your config file. 

``` yaml
deploy:
  type: git
  repo: https://github.com/Julian-Robinson/julian-robinson.github.io
```
and with that running the Hexo Deploy command automatically pushed the latest build of my blog to my GitHub Pages repository. Easy.

It wasn't until I tried scripting it I ran into problems...

Even though the docs mention you can stack config files to overwrite values this seemed to be pretty temperamental, sometimes it looked like it worked and sometimes it didn't. It wasn't until I create a second full deployment config file that this seemed to settle down. Not a huge deal but kind of annoying having to maintain some values in two places.

Also, for some reason running the Hexo deploy command from PowerShell caused an error... somewhere... it just didn't generate any content.  Swapping to a shell script sorted it out. Very strange though... I've never see something like this before.

Lastly, because the deployment script is force pushing to your GitHub repository each time I had to do a git clone into the .deploy_git folder before building so that the deployment history was maintained.

## Closing Thoughts

I'm quite impressed at the flexibility that Hexo provides - and I haven't even got into writing my own plugins or helpers yet! 

The documentation for basic operations is great and right out of the box I had enough to start creating content.  The themes were a bit of a let down but fortunately they are easy to create yourself. 

I would definitely recommend it to anyone who is looking to start a static site but is a bit intimidated by Jekyll or Ruby. 

Let me know below if you've found this useful, would love to hear some feedback.
And now that I've got my blog sorted I've got no excuse not to starting filling it with some content, so keep an eye out for future posts!
