# CivicConnect App Documentation

## Welcome to CivicConnect

CivicConnect is a community-driven app designed to help citizens easily report and track local issues, stay informed, and engage with their city's administration. This document provides a comprehensive overview of the app's features and functionality.

---

## Onboarding and Login

When a new user opens the app, they'll see a welcome screen with a **"Get Started"** button at the bottom and a **"Skip"** option in the top-right corner.

* **"Get Started"**: This button initiates a series of five instructional slides.
* **"Skip"**: This option directly takes the user to the login page.

### Onboarding Slides

The five onboarding slides guide the user through the app's core features. Each slide has a consistent layout:
1.  **Top Taskbar**: Includes a **"Previous"** button on the left and a **"Skip"** option on the right.
2.  **Main Body**: The central part of the screen where the content is displayed.
3.  **"Next" Button**: A prominent green gradient button at the bottom to advance to the next slide.

Here is a breakdown of each slide:

1.  **Slide 1: Spot an Issue?**
    * **Main Body**: Text and an image to introduce the concept of reporting issues.

2.  **Slide 2: Report an Issue**
    * **Main Body**:  and text explaining how to **click an image** and **upload it**.
    * **Main Body (below)**:  and text explaining how to **select a category** for the issue.

3.  **Slide 3: Describe and Locate**
    * **Main Body**:  and text explaining how to **enter a description** in either audio or text form.
    * **Main Body (below)**:  and text explaining the interactive map feature. The map shows issue markers with status tags (**submitted**, **in progress**, **resolved**) and allows filtering by department (**All**, **Roads and Transportation**, **Sanitation**, **Water**, **Street Light Lamp**).

4.  **Slide 4: Community Engagement**
    * **Main Body**:  and text encouraging the user to **be part of the community** to help make the city better.

5.  **Slide 5: Login/Account Creation**
    * **Main Body**: Two large buttons: **"Log in as a Citizen"** and **"Log in as an Onlooker"** for existing users.
    * **Bottom of screen**: A small text saying **"create an account of citizen"** for new users.

### Login Page

The login page allows users to authenticate their account.
* **Top-left**: "Gov. of Jharkhand" / App icon / City name.
* **Top-right**: Indian flag icon with a language change option.
* **Input Fields**: Users can log in using their name and Aadhaar-verified phone number, followed by an OTP.
* **Optional Profile Setup**: After logging in, users can optionally set up their profile with a profile photo and a GPS-detected address/ward.

---

## The App Experience

Once a user is logged in, they are shown a transition screen before entering the main application.

### Transition Screen
A short, animated transition screen displays highlights of the app's impact, such as:
* "🕳️ 50 potholes fixed this week"
* "🚮 your city is 10 kgs free of garbage"
* "💡 80% success rate in electricity-related issues."

### Citizen Dashboard (Home)

This is the main screen for a logged-in user.
* **Top Bar**:
    * **Left**: CivicConnect logo + "Citizen Dashboard."
    * **Center**: Auto-detected city/area name.
    * **Right**: Notification bell (🔔) and user profile icon.
* **Map Preview Card**: A mini interactive map (300px tall) with department filters on top. A "><" icon on the bottom-left allows the user to expand it to a full-screen map.
* **Report an Issue Section**: A card with a camera icon and the subtext, "See something wrong? Tap to capture & report."
* **City-wide Updates**: A right-slide card showing recent updates like "Trash pickup delayed" or "Traffic light outage."
* **Quick Stats Snapshot**: Horizontal scroll cards displaying key metrics like "total issue registered," "total issues solved," and "avg. response time" for different departments.

### Navigation Menu

The main navigation bar is at the bottom of the screen with five options:
1.  **Home**
2.  **My Reports**
3.  **(Report Camera)**: A slightly larger, circular camera icon placed in the center and slightly elevated.
4.  **Community**
5.  **Profile**

---

## My Reports

Clicking on **"My Reports"** switches the view to a list of a user's submitted issues.
* **Top-left**: "My Reports" text.
* **Top-right**: **"Drafts"** option to view saved reports.
* **Filters**: A series of filters for **Category**, **Status**, and **Date sort** (ascending/descending).
* **Issue Entries**: Each entry shows the date of reporting and the status of the issue.
* **Re-open Issue**: For solved issues, a **"re-open issue"** option is available.

---

## Report an Issue

Tapping the camera icon in the navigation menu takes the user to the report page.
* **Top-left**: "Report" heading.
* **Content**:
    * **Add Photo**: Tapping this opens the phone's camera (no gallery access).
    * **Input Fields**: Spaces for a **title**, **description**, **category**, and an optional **landmark**.
* **Buttons**: A **"Submit"** button and a **"Save to Drafts"** option below it.

---

## Profile

The profile page is divided into several sections.
* **Title**: "Profile"
* **Account Settings**:
    * **Edit Profile**
    * **Change Password**
* **App Preferences**:
    * **Dark/Light Mode**
    * **Language**
* **Notifications**:
    * A heading with an on/off toggle button.
* **Help and Support**:
    * **Privacy Policy**
    * **Help and Support**

---

## Community

The community section allows users to view and interact with public reports.
* **Top-right**: A **"Category Filter"**.
* **Navigation Tabs**: Two central navigation tabs, **"Trending"** and **"Latest"**, which can be slid or selected.
* **Trending Reports**: Displays up to 15 reports that have a minimum of 50 upvotes in the shortest time.
* **Report Card Layout**:
    * **Department Icon**: Instead of a dish icon, a department icon is shown.
    * **Issue Title**: Replaces the dish name.
    * **Last Updated Date**: Replaces the tagline.
    * **Status Tag**: The status (**submitted**, **in progress**, **resolved**) of the report is displayed.

---

## Issue Card (Detailed View)

Clicking on a report from either **"My Reports"** or **"Community"** opens a detailed view.
* **Top**: The image uploaded with the report is displayed.
* **Below Image**: The last updated date. A user can only edit their own reports in "My Reports," not those in the community section.
* **Content**:
    * **Category**: The selected category of the issue.
    * **Expected Resolution Time**: An estimated time provided by the administration.
    * **Description**: The description of the issue.
    * **Landmark**: The optional landmark provided by the user.
* **Bottom Buttons**: Two inline buttons:
    * **"Edit"**: Allows the user to change the description and landmark, which automatically updates the "last updated date."
    * **"Delete"**: Deletes the report.

---

## Notifications

Notifications are sent to the user for two main reasons:
1.  **Status Updates**: When the status of a user's reported issue changes.
2.  **Upvotes**: When a user's report receives 5 upvotes.
