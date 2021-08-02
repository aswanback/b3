
# Todo List

## FRONT END

### Not Implemented Yet
• Filters dropdown
• Profile half-page
    • Forgot/change password page
    • Logout button
• Pinned tab
• Click to enlarge - associated info page
• Gallery mode
• Metadata filtering
• reject blank password so doesnt go thru to firebase
• forgot password on login
* swag

### Needs fixed
• Check page transitions for white flashes
• Fix error catching in login/create account
• Fix splash screen
• Formatting of FlatList
- make text boxes for log in have a less black outline. probably just white
= board page center top logo. idk what to put but obviously it looks stupid as shit rn. maybe just smaller



## BACK END

### Not Implemented Yet
• Remember me
• Change/forgot password
• Reporting and notification
• Metadata
• Concurrent flyer upload
• use .env for hiding API Key, SecureStore somehow


### Needs Fixed
• Reupload/download
• Reformat firebase confirmation and reset emails for auth


## BACKEND IDEAL FLOW - tab indicates we must wait for process above 
    IN DATABASE example:
        1: 
            status: (active)(deleted)
            url: (url)
            uid: (uid)
            organization: (none)(organization)
            eventDate: (none)(date)
            contact: (none)(contact)
        numFlyers: 1

    
    -> on enter to board page, we have given UID

    -> download flyers
        -> fetch numFlyers
            -> loop through each flyer
                -> store all data in seperate arrays
                    -> loop each image number, checking each array for info
                        -> if status is active add to Flyers using url
                        -> set doneDownloading to true


                        Later: if UID matches image UID for each image, display delete button
                               Display optional info somehow
    
    -> upload flyer
        -> fetch numFlyers
            -> add to database as numFlyers + 1
            -> status: active, all other info
            -> numFlyers++ 
        -> call download process but only for that image

    

