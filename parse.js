const DETAILED_DEBUG = false;

let getRelevantMsgs = () => {
  let relevantMsgs = [];
  $("#js_1").children().each((_, msg) => {
    //_497p
    // This line looks for the timestamps that show up in between conversations
    if($(msg).attr("class") == "_497p _2lpt"){
      relevantMsgs = [];
    // If there is a container div with no class then we know that it is a message
    // block that is sent by somebody
    }else if($(msg).attr("class") === undefined){
      // children.first bc there is this unnecessary double nested div
      relevantMsgs.push($(msg).children().first().children("._41ud"));
    }else{
      console.log("ERROR: couldn't find the header class. instead found:")
      console.log($(msg).attr("class"));
    }
  });
  return relevantMsgs;
}

let findTimeSent = (element) => {
  let time = $(element).find(`div[data-tooltip-content]`).first().attr("data-tooltip-content");
  let segments = time.split(" ");
  let lastSegment = segments[segments.length - 1];
  if(lastSegment == "AM" || lastSegment == "PM"){
    return segments[segments.length - 2] + lastSegment.toLowerCase();
  }
  return lastSegment
}

/*parse.js:25 Uncaught TypeError: Cannot read property 'split' of undefined
*/

let parseConvo = (relevantMsgs) =>{
  let convo = [];

  relevantMsgs.forEach((msg) => {
    let person = msg.children().first().attr("aria-label");
    // This element is a reply
    if(person === undefined){
      replyStr = msg.find("i").first().parent().text();
      person = replyStr.split("replied to")[0].trim();
      console.log(person)
      if(person === "You"){
        person = YOUR_NAME;
      }
    }
    // TODO: add a json attr that says if you wrote the msg
    // you can find out who wrote the message by looking at the same attr as the
    // one where you find the person's name
    // if it is you, there is a accessible_elem class in that div
    //TODO: fix issues where you call ppl
    let chats = msg.children(".clearfix");
    chats.each((_, texts)=>{
      // TODO: NOT SURE HOW THIS SCRIPT HOLDS UP TO RECORDINGS OR GAMES
      // TODO: MAYBE LOOK INTO REMOVED MESSAGES AS WELL
      let timeSent;
      try{
        timeSent = findTimeSent(texts);
      }
      catch(error){
        console.log("ERROR: Couldn't parse timeSent");
        console.log(error);
        return
      }

      // this "if" needs to be here first bc the read receipt img shouldn't trigger the "find img block"
      // finds texts
      if($(texts).find("span._3oh-").length !== 0){
        // note: there could be a link in there
        // note: if there is a visual of the link destination it should be within the same .clearfix block as the text
        let words = $(texts).find("span._3oh-").text()
        if(DETAILED_DEBUG){
          console.log(`${person}: ${words}`);
        }
        convo.push({
          "person": person,
          "type": "text",
          "msg": words,
          "timeSent": timeSent
        })
      // finds uploaded images
      }else if($(texts).find('img').length !== 0){
        if(DETAILED_DEBUG){
          console.log(`${person}: img`);
        }
        convo.push({
          "person": person,
          "type": "img",
          "timeSent": timeSent
        });
        // finds attachments
      }else if($(texts).find("a._4pcn").length !== 0){
        if(DETAILED_DEBUG){
          console.log(`${person} attachment`)
        }
        convo.push({
          "person": person,
          "type": "attachment",
          "timeSent": timeSent
        })
      }else{
        console.log("ERROR: COULDN'T FIND WHAT THIS ELEMENT IS")
        console.log($(texts).html());
      }
    })
  });
  return convo;
};