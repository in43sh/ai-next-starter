"use client";
import { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const companyInfo = {
  company_name: "Espresso Essence",
  value_proposition:
    "High-quality, ethically sourced coffee in a cozy, community-focused setting",
  mission_statement:
    "To provide a warm and welcoming space where our customers can enjoy the best coffee, sourced responsibly and brewed to perfection, while also fostering a sense of community and connection.",
};

const companyReviews = [
  {
    username: "coffeeLover73",
    rating: 4.5,
    review_text:
      "I love Espresso Essence! The coffee really is high-quality and always brewed to perfection. I can tell they take their mission statement seriously.",
  },
  {
    username: "morningRush",
    rating: 2,
    review_text:
      "The coffee tastes great, but the service is incredibly slow. Not ideal for someone in a hurry to get to work.",
  },
  {
    username: "organicChick",
    rating: 5,
    review_text:
      "Loved the socially responsible ethos of Espresso Essence. Delicious coffee, friendly staff, and comfortable ambiance. Love that they source the coffee ethically!",
  },
  {
    username: "beansNBrew",
    rating: 3.5,
    review_text:
      "Good coffee but a bit pricey. Wish they had more affordable options.",
  },
  {
    username: "espressoAddict",
    rating: 5,
    review_text:
      "Nothing beats a good espresso, and Espresso Essence nails it every time. They clearly take their coffee seriously. Love it!",
  },
  {
    username: "studiousStudent",
    rating: 4,
    review_text:
      "A comfortable place to study and great coffee. However, it can get a bit crowded at times.",
  },
  {
    username: "mochaMan",
    rating: 1,
    review_text:
      "The mocha I had here was too sweet. They should work on getting the right balance of flavors.",
  },
  {
    username: "latteLover",
    rating: 4,
    review_text:
      "I love their lattes! However, the lack of parking nearby is a hassle.",
  },
  {
    username: "chaiChampion",
    rating: 5,
    review_text:
      "While their coffee is great, don't dismiss their chai. It's the best I have ever had. Warm and welcoming place.",
  },
  {
    username: "onTheRun",
    rating: 2,
    review_text:
      "Can't deny the coffee is good, but they really need to be quicker with their service.",
  },
  {
    username: "caffeinatedCoder",
    rating: 4,
    review_text:
      "The coffee is great, the space is a bit cramped. Maybe a refurbishing is in order?",
  },
  {
    username: "busyMom",
    rating: 3,
    review_text:
      "They don't have a lot of kid-friendly options. But as long as I can get my coffee fix, it's okay.",
  },
  {
    username: "digitalNomad",
    rating: 4.5,
    review_text:
      "WiFi connection is solid, great coffee, and nice ambiance, altogether perfect for a digital nomad.",
  },
  {
    username: "vanillaVenturer",
    rating: 5,
    review_text:
      "Their vanilla latte is out of this world! Really love their mission of fostering a community.",
  },
  {
    username: "conscientiousConsumer",
    rating: 5,
    review_text:
      "Kudos to Espresso Essence for ethically sourcing their coffee. More companies should follow their example.",
  },
  {
    username: "sleeplessStudent",
    rating: 5,
    review_text:
      "The coffee here really helps me pull those late-night study sessions. Great place!",
  },
  {
    username: "riseNshine",
    rating: 1.5,
    review_text:
      "I found a bitter aftertaste in my coffee. Was expecting a lot more from them.",
  },
  {
    username: "yogaJunkie",
    rating: 5,
    review_text:
      "Love how they have created a cozy setting. A great pit stop after my early morning yoga sessions.",
  },
  {
    username: "networkingGuru",
    rating: 2,
    review_text: "The space gets too noisy to have meetings or focused work.",
  },
  {
    username: "cultureVulture",
    rating: 4.5,
    review_text:
      "Love the community-focused vibe here. A great place for readers, writers, artists to come together over a cup of coffee.",
  },
];

export default function SingleCompletion() {
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set the generated text and watch for changes
  const [generatedText, setGeneratedText] = useState("");

  //   const handleInput = (event) => {
  //     setUserInput(event.target.value);
  //   };

  const handleDateInput = (event) => {
    setDate(event.target.value);
  };

  const handleInfoInput = (event) => {
    setInfo(event.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      fetchGeneratedText();
    }
  };

  // Send the prompt to the API and set the generated text
  const fetchGeneratedText = async () => {
    console.log("date ===> ", date);
    console.log("info ===> ", info);
    setIsLoading(true);
    console.log(userInput);
    try {
      // const messages = [
      //   { role: "user", content: { date, companyInfo, companyReviews } },
      // ];

      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, companyInfo, companyReviews }),
      });

      const data = await response.json();
      console.log("data", data.message);

      setGeneratedText(data.message);
      setUserInput("");
      setIsLoading(false);
    } catch (error) {
      setGeneratedText(error.message);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: "100vw",
        height: "100vh",
        pt: 2,
        position: "relative",
      }}
    >
      <Link href="/">
        <Button
          variant="outlined"
          sx={{ position: "absolute", top: "10px", left: "10px" }}
        >
          Back
        </Button>
      </Link>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginTop: "8px", fontWeight: "bold" }}
      >
        Single Completion Example
      </Typography>

      <TextField
        fullWidth
        placeholder="Put the date"
        value={date}
        type="date"
        onChange={handleDateInput}
        onKeyDown={handleKeyDown}
      />
      <TextField
        fullWidth
        placeholder="Put your company info"
        value={info}
        onChange={handleInfoInput}
        onKeyDown={handleKeyDown}
      />

      <Button onClick={() => fetchGeneratedText()}>Submit</Button>

      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          p: 1,
          borderRadius: "10px 10px 5px 10px",
        }}
      >
        {isLoading && <LinearProgress />}
        <Typography variant="h6">Generated Text:</Typography>
        <ReactMarkdown>{generatedText}</ReactMarkdown>
      </Paper>
    </Container>
  );
}