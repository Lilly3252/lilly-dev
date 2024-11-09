# My Bot

## Description
This bot is designed to assist with various tasks for moderating your server. With commands to have a little bit of fun !

## Moderation Commands

| Name | Option | Description | Type | Required | Choices |
|------|--------|-------------|------|----------|---------|
| ban | | Ban a member | Command | | |
|  | target | Select a user to ban. | User | true |  |
|  | days | number of days that you want to delete. | Number | true | 0 day, 1 day, 2 days, 3 days, 4 days, 5 days, 6 days, 7 days |
|  | reason | Reason of the ban. | String | true |  |
|  | hide | Hides the output. | Boolean | false |  |
| blacklist | | Add a user to the blacklist. | Command | | |
|  | target | User to be added | User | true |  |
|  | hide | Hides the output. | Boolean | false |  |
| kick | | Kick a user. | Command | | |
|  | target | Select a user to kick | User | true |  |
|  | reason | Reason of the kick | String | false |  |
|  | hide | Hides the output | Boolean | false |  |
| lock | | lock a channel | Command | | |
|  | activate | lock this channel? | Boolean | true |  |
|  | hide | Hides the output | Boolean | false |  |
| restrict | | restrict a member | Command | | |
|  | target | Select a user to restrict | User | true |  |
|  | restriction | select a restriction | String | true | Embed, Reaction, Voice, Slash, Poll |
|  | reason | Reason of the restriction | String | true |  |
|  | hide | Hides the output | Boolean | false |  |
| settings | | Show or add settings. | Command | | |
| show | | Show settings from the guild. | Subcommand | - | |
|  | hide | Hides the output | Boolean | false |  |
| audit_log | | Enable/disable audit logs | Subcommand | - | |
|  | choice | enable or disable the logs. | Boolean | true |  |
|  | hide | Hides the output. | Boolean | false |  |
| channels | | Setup log and welcome channel | Subcommand | - | |
|  | channels | Select your channels. | String | true | Welcome Channel, Mod Log |
|  | channel | select a channel. | Channel | true |  |
|  | hide | Hides the output. | Boolean | false |  |
| events | | Set all your events for logging purposes | Subcommand | - | |
|  | events | select your events. | String | false |  |
|  | hide | Hides the output. | Boolean | false |  |
| restriction-roles | | Set all your restriction roles for the guild | Subcommand | - | |
|  | role_id | Select the role to assign. | Role | true |  |
|  | role | Select your restriction role type. | String | false | Embed, Reaction, Voice, Slash, Poll, Safe |
|  | hide | Hides the output. | Boolean | false |  |
| slowmode | | Enabling a slowmode on the current channel. | Command | | |
|  | channel | Channel for the slowmode | Channel | true |  |
|  | time | Time of the slowmode ( in seconds ) | Number | true |  |
|  | hide | Hides the output | Boolean | false |  |
| timeout | | Timeout a member. | Command | | |
|  | target | The member to timeout. | User | true |  |
|  | duration | The duration of the timeout in seconds. | Integer | true |  |
|  | reason | The reason for the timeout. | String | false |  |
|  | hide | Hides the output. | Boolean | false |  |
| unban | | unban a user. | Command | | |
|  | id | put a id | String | true |  |
|  | reason | reason for revoking the ban | String | false |  |
|  | hide | Hides the output | Boolean | false |  |

## Utility Commands

| Name | Option | Description | Type | Required | Choices |
|------|--------|-------------|------|----------|---------|
| addnotes | | Manage user notes | Command | | |
|  | action | The action to perform (add, view, delete) | String | true | add, view, delete |
|  | target | The target to manage notes for | User | true |  |
|  | note | The note to add (required for add action) | String | false |  |
| info | | informations. | Command | | |
| user | | Show user info. | Subcommand | - | |
|  | target | get the member you want information from. | User | true |  |
|  | verbose | show complete information | Boolean | false |  |
|  | hide | Hides the output | Boolean | false |  |
| channel | | Show channel info. | Subcommand | - | |
|  | channel | choose the channel | Channel | true |  |
|  | verbose | show complete information | Boolean | false |  |
|  | hide | Hides the output | Boolean | false |  |
| role | | Information about a role in the guild | Subcommand | - | |
|  | role | Select a role. | Role | true |  |
|  | verbose | show complete information | Boolean | false |  |
|  | hide | Hides the output. | Boolean | false |  |
| bot | | see bot's info | Subcommand | - | |
|  | verbose | show complete information | Boolean | false |  |
|  | hide | Hides the output. | Boolean | false |  |
| server | | see server info | Subcommand | - | |
|  | verbose | show complete information | Boolean | false |  |
|  | hide | Hides the output. | Boolean | false |  |
| pet | | Manage your virtual pet | Command | | |
|  | buy | Buy an item from the shop | Subcommand Group | false |  |
| adopt | | Adopt a new pet | Subcommand | - | |
|  | petname | The name of your pet | String | true |  |
|  | pettype | The type of pet | String | true | Dog, Cat, Rabbit, Bird, Fish, Hamster, Turtle, Guinea Pig, Lizard, Snake, Frog, Parrot, Ferret, Hedgehog, Chinchilla |
| feed | | Feed your pet | Subcommand | - | |
|  | itemname | The name of the item | String | true |  |
| play | | Play with your pet | Subcommand | - | |
|  | itemname | The name of the item | String | false |  |
| status | | Check the status of your pet | Subcommand | - | |
| care | | Take care of your pet | Subcommand | - | |
|  | itemname | The name of the item used | String | false |  |
| train | | Train your pet | Subcommand | - | |
|  | skill | The skill to train your pet | String | true |  |
| battle | | Battle with another pet | Subcommand | - | |
|  | opponent | The ID of the opponent | String | true |  |
| quest | | Start a quest | Subcommand | - | |
|  | questname | The name of the quest | String | true |  |
| daily | | Get 50 coins! (available each 24h) | Subcommand | - | |
| ping | | check ping. | Command | | |
|  | hide | Hides the output | Boolean | false |  |
| poll | | do a poll. | Command | | |
|  | duration | Duration of the poll (in seconds 1 = 1 hour , MAX = 168 (a week)) | Number | true |  |
|  | question | Ask a question | String | true |  |
|  | answer1 | answers 1 | String | true |  |
|  | answer2 | answer2 | String | false |  |
|  | answer3 | answer3 | String | false |  |
|  | answer4 | answer4 | String | false |  |
|  | answer5 | answer5 | String | false |  |
|  | answer6 | answer6 | String | false |  |
|  | answer7 | answer7 | String | false |  |
|  | answer8 | answer8 | String | false |  |
|  | answer9 | answer9 | String | false |  |
|  | answer10 | answer10 | String | false |  |
| tag | | get a tag | Command | | |
|  | query | tag | String | true |  |
| test | | test. | Command | | |
|  | query | query | String | true |  |
|  | hide | Hides the output | Boolean | false |  |

