# Create a Reddit Post Dashboard
We have our simplified snapshot data of a post from reddit API mentioned in the below URL. We would like to have a simple web page which display the post regarding to the design provided below.
As a user, I expect to be able to read the post and read and delete comments.

Snapshot URL:
https://gist.githubusercontent.com/mkg0/6a4dca9067ad7a296204e7c9ecd977b0/raw/0b1ec16580ea1e970a73f5c85563c22631be7ad7/unpopularopinion-dataset.json
Design(Invision) - https://invis.io/VNUYXTO8FEK (Password - D3vChall3ng3)

You will receive an email from us inviting you as a collaborator on this project on Invision.

## TECHNICAL ASPECT:
* Use any tech stack you would like, but we strongly suggest you use lean bootstrapping projects like create-react-app or something relevant.
* Feel free to share your code as a URL of the repository or folder from any file storage service or as a ZIP file. (would be nice to have `.git` folder anyway)
* If you’re unsure about something or need more specs, just improvise. You have freedom.

## POINTS TO CLARIFY:
* Comments should show nested relations in appearance(`parent_id` field of comments indicates which comment they related to as a child comment). Feel free to improve UX in that topic.
* You’re totally free to choose your tools but we don’t want you to waste too much time.
* You can use a state machine library (like redux) if you think it’s necessary but it’s optional.
* Consume snapshot data as an async request and feel free to handle unexpected cases.
* Add delete functionality on comments

## BONUS:
* Unit tests
* Sort posts by last commented first