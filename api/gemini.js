const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { systemPrompt, userPrompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemPrompt
              }
            ]
          },
          contents: [
            {
              parts: [
                {
                  text: userPrompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;