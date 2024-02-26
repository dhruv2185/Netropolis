# Netropolis
## Live URL

(Will be updated soon!)

## Description

This project tackles the challenges posed by Japan's unique aging population and declining birthrate. Due to the declining population caused by the falling birthrate and aging population, local cities are depopulating, resulting in a loss of workers day by day. In rural areas where labor is scarce, it is increasingly difficult to maintain the history, culture, and economy that local residents have created over the years. This project aims to address the shortage of local workers by bringing in help from outside the region to establish a local city system of economy, culture, and history.

The solution proposed is to provide work tasks that compensate for the labor shortage in rural areas as a package of experiences for staying in the region and matching them with other regions.

The goal of the project is to propose functions to build a matching platform that matches local labor shortage tasks with users who want to experience the local area, providing opportunities for users to enthusiastically and actively tour the area like an RPG game. The platform includes features such as login, quest registration, scheduling, user quest search, and quest request from users.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Built With](#built-with)

## Features

- Login Function: Uses Google OAuth 2.0.
- Quest Registration
- Scheduling Function
- User quest search function: Uses VectorDB and LLM.
- Quest request function from users
- Team Registration

## Getting Started

### Prerequisites

- Python version 3.10.x or newer.

### Installation

- Clone the repository: `git clone https://github.com/dhruv2185/Netropolis.git`

#### Frontend

- Navigate to project directory: `cd netropolis_frontend`
- Install dependencies: `npm install`

#### Backend

- Navigate to project directory: `cd netropolis_backend`
- Create a virtual environment: `python -m venv env`
- Activate the virtual environment:
  - For Windows: `/env/Scripts/activate`
  - For Linux: `source ./env/bin/activate`
- Install required modules: `pip install -r requirements.txt`
- Initialize application:
  - `python manage.py makemigrations`
  - `python manage.py migrate`

### Configuration

- Rename `.env.example` in `/netropolis_backend` and `/netropolis_frontend` to `.env`
- Open `.env` and set your configuration varibles.

### Usage

#### Frontend

- Start the app: `npm run dev`

#### Backend

- Start the app: `python manage.py runserver`

### Built With

- React + Vite
- Django Rest Framework
- PostgreSQL
- Python
- VectorDB
- Sentence transformers(LLM)

## Miscellaneous
(Will be updated soon)
- Google Drive link (Demo Video and Documentation for submission) : https://drive.google.com/drive/folders/1vI5s1vZxrFzV2tq2T8qda_DDiJcBPARG?usp=sharing
- Figma Link : https://www.figma.com/file/Ljaj2dko4PNk4VZqJIa4uD/Untitled?type=design&node-id=0%3A1&mode=design&t=O1FUnCXwqboAd29T-1
