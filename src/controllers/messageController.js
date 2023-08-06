const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to, array_id } = req.body;

    if (Array.isArray(to)) {
      const messages = await Messages.find({
        group_Id: {
          $all: array_id,
        },

      }).sort({ updatedAt: 1 });


      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          name: msg.name_send
        };
      });
      res.json(projectedMessages);

    }
    else {
      const messages = await Messages.find({
        users: {
          $all: [from, array_id],
        },
      }).sort({ updatedAt: 1 });

      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          name: msg.name_send

        };
      });
      res.json(projectedMessages);

    }

    // const messages = await Messages.find({
    //   users: { $in: [from, to] },
    // });


  } catch (ex) {
    next(ex);
  }
};

module.exports.addGroup = async (req, res, next) => {
  try {

    const data = await Messages.create({
      // message: { text: req.body.message },
      users: req.body.users,
      sender: req.body.users,
    });

    console.log({ data });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, array_Id, name } = req.body;

    console.log({ name })

    if (Array.isArray(to)) {
      const userId = to.concat(from)

      const data = await Messages.create({
        message: { text: message },
        users: userId,
        sender: from,
        group_Id: array_Id,
        name_send: name
      });

      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });

    } else {

      const data = await Messages.create({
        message: { text: message },
        users: [from, array_Id],
        sender: from,
      });

    }



  } catch (ex) {
    next(ex);
  }
};

