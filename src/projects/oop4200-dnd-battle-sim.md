---
title: D&D Battle Simulator
author: Blade Lucas
semester: 4
tags: projects
image: /assets/projects/...
imageAlt: D&D Battle Sim
description: This project had us use OOP principles to create a game in C# and .NET.
project: OOP4100 - D&D Battle Simulator Game
---
**Project:** {{project}}  
**Completed:** Semester {{semester}} by {{author}}  
**Description:** {{description}}

This was the semester long Object-Oriented Programming project I worked on with a group of 2 others in the Advanced OOP course. 

We were tasked with creating a game using OOP principles learned throughout the beginner, intermediate and advanced level OOP courses. We chose to make a battle simulator for the game Dungeons and Dragons. The game is traditionally played tabletop with pens, paper and imagination, we made it our task to make it into a desktop game using C# and .NET.

I was the lead developer on this project, and together, myself and one of my teammates developed a character/party creation screen, as well as a multi-level game where the characters you created would be put on a battlefield with a dynamically determined number of enemies, increasing in difficulty with every level cleared, where they would have to fight until they either defeated all enemies, which would trigger them to move to the next level, or were defeated themselves which would trigger the game over screen. The game would generate new levels until the defeat condition was met, at which point the players statistics, which were tracked throughout the game would be displayed for the player to review.

The game also featured a fairly basic enemy AI system which controlled the enemies on the board, it would determine thier movements, which player characters they would target, and what attacks they would use. The pathfinding system used a Breadth First search to locate players and determine the quickest unobstructed path to them. The rest of the AI mostly relied on randomization to determine other actions to be taken.

We received a near perfect mark of 97% on this project and it largely inspired the creation of my Capstone project.