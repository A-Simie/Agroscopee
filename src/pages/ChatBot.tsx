import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Leaf } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface DiseaseKnowledge {
  [key: string]: {
    greeting: string;
    expertResponses: {
      [key: string]: string[];
    };
  };
}

const diseaseKnowledge: DiseaseKnowledge = {
  "powdery-mildew": {
    greeting:
      "Hello! I'm Dr. Green, your plant disease specialist. I see you're dealing with Powdery Mildew. According to recent AgroScope research reports, this is one of the most common fungal diseases. How can I help you today?",
    expertResponses: {
      treatment: [
        "Based on AgroScope Report #2024-PM-301, the most effective organic treatment involves a combination approach. Mix 2 teaspoons of neem oil with 1 gallon of water and a few drops of mild dish soap. Apply every 7-10 days.",
        "AgroScope's field studies (Report #2023-FM-442) show that early intervention is crucial. The white powdery spots you see are fungal spores. Begin treatment immediately when first noticed.",
      ],
      prevention: [
        "According to AgroScope's Prevention Guidelines 2024, proper air circulation is your first line of defense. Space plants adequately and prune dense foliage to reduce humidity around leaves.",
        "Research from AgroScope (Study #2023-ENV-128) indicates that watering at soil level rather than overhead reduces infection rates by up to 60%. Water in the morning so leaves dry quickly.",
      ],
      weather: [
        "AgroScope's Climate Impact Report shows that powdery mildew thrives in temperatures between 60-80°F with high humidity. Monitor conditions closely during these periods.",
        "Based on meteorological data analysis by AgroScope, nighttime humidity above 70% significantly increases infection risk. Consider using fans in greenhouses during high-risk periods.",
      ],
      identification: [
        "AgroScope's diagnostic guidelines confirm that the white powdery appearance on leaves and stems is characteristic of this fungus. Unlike other diseases, it doesn't require standing water to spread.",
        "According to AgroScope Report #2024-DG-157, early symptoms include slight leaf curling and distortion before the white patches become visible. Regular monitoring helps catch it early.",
      ],
      default: [
        "That's an excellent question. According to AgroScope research, powdery mildew management requires an integrated approach combining cultural practices, organic treatments, and environmental control.",
        "Based on extensive AgroScope field trials, consistency in treatment is more important than intensity. Regular monitoring and prompt action lead to the best outcomes.",
      ],
    },
  },
  "soybean-rust": {
    greeting:
      "Welcome! I'm Dr. Green, specializing in plant pathology. I understand you're concerned about Soybean Rust. According to AgroScope Agricultural Research Division, this is a serious fungal disease requiring immediate attention. What would you like to know?",
    expertResponses: {
      treatment: [
        "AgroScope Report #2024-SR-445 recommends immediate application of fungicides at first sign of infection. For organic options, neem oil or potassium bicarbonate can slow early-stage spread.",
        "According to AgroScope's Fungicide Efficacy Study 2023, triazole-based fungicides show 85% effectiveness when applied during early infection stages. Timing is critical.",
      ],
      prevention: [
        "AgroScope's Crop Management Guidelines emphasize early planting of resistant varieties. Their 2024 study shows that resistant cultivars reduce infection rates by up to 70%.",
        "Research from AgroScope Institute indicates that crop rotation and removal of volunteer plants significantly reduce overwintering spore populations.",
      ],
      identification: [
        "According to AgroScope Diagnostic Manual, soybean rust appears as tan to dark brown pustules on leaf undersides. Use a hand lens to confirm the characteristic pyramid-shaped pustules.",
        "AgroScope's early detection protocol recommends weekly scouting, especially during warm, humid weather when infection pressure is highest.",
      ],
      default: [
        "Based on AgroScope's comprehensive research on soybean rust, this disease requires vigilant monitoring and rapid response. The fungus can spread quickly under favorable conditions.",
        "AgroScope field data shows that yield losses can reach 80% in severe cases. Early detection and treatment are your best defense.",
      ],
    },
  },
  "maize-leaf-blight": {
    greeting:
      "Hello! Dr. Green here, your crop disease expert. I see you're dealing with Maize Leaf Blight. AgroScope's Cereal Disease Division has extensive research on this pathogen. How can I assist you?",
    expertResponses: {
      treatment: [
        "According to AgroScope Report #2024-MLB-332, copper-based fungicides are effective when applied at first symptoms. For organic growers, compost tea shows promising results in field trials.",
        "AgroScope's treatment protocols emphasize removing infected lower leaves to reduce inoculum. Their studies show this can reduce disease spread by 40%.",
      ],
      prevention: [
        "AgroScope Crop Research indicates that hybrid selection is crucial. Choose varieties with good resistance ratings from the AgroScope Maize Variety Trial results.",
        "Based on AgroScope agronomic studies, adequate spacing between plants improves air circulation and reduces infection pressure by up to 50%.",
      ],
      identification: [
        "AgroScope's Disease Identification Guide describes maize leaf blight as elongated, grayish-tan lesions on leaves. The lesions often have distinct margins.",
        "According to AgroScope diagnostics, symptoms typically start on lower leaves and progress upward. Monitor lower canopy levels first during scouting.",
      ],
      default: [
        "AgroScope's integrated management approach for maize leaf blight combines resistant varieties, cultural practices, and targeted fungicide applications for optimal control.",
        "Research from AgroScope shows that environmental conditions play a major role. High humidity and moderate temperatures favor disease development.",
      ],
    },
  },
  "tomato-early-blight": {
    greeting:
      "Greetings! I'm Dr. Green, your vegetable crop specialist. Tomato Early Blight is a common concern, and AgroScope has conducted extensive research on its management. What specific information do you need?",
    expertResponses: {
      treatment: [
        "AgroScope Report #2024-TEB-228 recommends a baking soda spray (1 tsp per quart of water) applied weekly. Their trials show 65% reduction in disease progression.",
        "According to AgroScope fungicide trials, copper-based products or those containing chlorothalonil are most effective when applied preventatively before symptoms appear.",
      ],
      prevention: [
        "AgroScope's cultural practice guidelines strongly recommend removing lower leaves and avoiding overhead irrigation. Their research shows this reduces infection by 55%.",
        "Based on AgroScope's crop rotation studies, a 3-year rotation away from solanaceous crops significantly reduces soil-borne inoculum levels.",
      ],
      identification: [
        "According to AgroScope Diagnostic Manual, early blight creates characteristic concentric rings, often described as 'target spot' lesions on older leaves.",
        "AgroScope research notes that symptoms typically begin on the oldest, lowest leaves and spread upward as the season progresses.",
      ],
      default: [
        "AgroScope's comprehensive early blight management program emphasizes prevention through good cultural practices combined with timely fungicide applications.",
        "Field studies by AgroScope show that mulching around plants reduces splash-dispersal of spores from soil, cutting infection rates by 30%.",
      ],
    },
  },
  "apple-scab": {
    greeting:
      "Welcome! I'm Dr. Green, your orchard health advisor. Apple Scab is a significant disease, and AgroScope's Pomology Research Center has decades of data on its control. How can I help?",
    expertResponses: {
      treatment: [
        "AgroScope Report #2024-AS-556 indicates that sulfur-based fungicides applied during the dormant season are highly effective. Apply lime sulfur at bud break for best results.",
        "According to AgroScope's treatment timeline, applications of myclobutanil or captan during the primary scab season (early spring) provide excellent protection.",
      ],
      prevention: [
        "AgroScope's orchard management research emphasizes sanitation: remove all fallen leaves in autumn, as they harbor overwintering spores that cause spring infections.",
        "Based on AgroScope pruning studies, opening up the tree canopy through proper pruning improves air circulation and leaf drying, reducing infection by 45%.",
      ],
      identification: [
        "According to AgroScope's Field Guide, apple scab appears as olive-green to black spots on leaves and fruit, with a velvety texture in humid conditions.",
        "AgroScope diagnostics note that severely infected fruit become deformed and may crack, creating entry points for secondary infections.",
      ],
      default: [
        "AgroScope's integrated scab management combines resistant varieties, cultural practices, and strategic fungicide use for sustainable control.",
        "Research from AgroScope shows that weather-based disease forecasting models can reduce fungicide applications by 40% while maintaining control.",
      ],
    },
  },
  "wheat-stripe-rust": {
    greeting:
      "Hello! Dr. Green here, specializing in cereal crop diseases. Wheat Stripe Rust is a serious concern, and AgroScope's Cereal Pathology Unit has cutting-edge research on this disease. What would you like to know?",
    expertResponses: {
      treatment: [
        "AgroScope Report #2024-WSR-673 recommends triazole or strobilurin fungicides at early infection stages. Their efficacy trials show optimal results when applied before 20% disease severity.",
        "According to AgroScope's fungicide timing studies, a single well-timed application at flag leaf emergence provides better protection than multiple late applications.",
      ],
      prevention: [
        "AgroScope Variety Testing Program identifies resistant cultivars annually. Plant varieties with good stripe rust ratings for your region.",
        "Based on AgroScope research, removing volunteer wheat plants eliminates the 'green bridge' that allows rust to survive between seasons.",
      ],
      identification: [
        "According to AgroScope Diagnostic Standards, stripe rust produces yellow-orange pustules arranged in stripes parallel to leaf veins - a distinctive pattern.",
        "AgroScope's early detection protocols recommend scouting when conditions are cool (50-65°F) and humid, as these favor rapid disease development.",
      ],
      default: [
        "AgroScope's integrated rust management strategy emphasizes resistant varieties as the foundation, supplemented by fungicides only when necessary.",
        "Field research by AgroScope demonstrates that stripe rust can cause 50-70% yield losses in susceptible varieties under favorable conditions.",
      ],
    },
  },
  "citrus-canker": {
    greeting:
      "Greetings! I'm Dr. Green, your citrus disease specialist. Citrus Canker is a bacterial disease, and AgroScope's Tropical Crop Division has extensive experience with its management. How can I assist?",
    expertResponses: {
      treatment: [
        "AgroScope Report #2024-CC-891 states that copper-based bactericides are the primary treatment. Apply copper hydroxide sprays during flush growth periods for maximum protection.",
        "According to AgroScope's treatment protocols, maintaining tree health through proper nutrition is crucial. Well-nourished trees show better resistance to infection.",
      ],
      prevention: [
        "AgroScope's cultural practice guidelines emphasize windbreaks to reduce wind-driven rain, which spreads the bacteria. Strategic barrier plantings reduce infection by 35%.",
        "Based on AgroScope sanitation research, pruning out infected branches and sterilizing tools between cuts prevents within-grove spread.",
      ],
      identification: [
        "According to AgroScope Diagnostic Guide, citrus canker creates raised, corky lesions with yellow halos on leaves, stems, and fruit.",
        "AgroScope research notes that lesions on fruit reduce marketability even if the internal quality remains good. Severe infections cause premature fruit drop.",
      ],
      default: [
        "AgroScope's canker management program combines copper sprays, pruning, and storm protection for comprehensive disease control in citrus groves.",
        "Field studies by AgroScope show that young trees are most susceptible during periods of active growth when tender tissue is abundant.",
      ],
    },
  },
  "potato-late-blight": {
    greeting:
      "Welcome! Dr. Green here, your potato disease expert. Late Blight is one of the most destructive plant diseases, and AgroScope has been at the forefront of research since the historic Irish Potato Famine. What do you need to know?",
    expertResponses: {
      treatment: [
        "AgroScope Emergency Report #2024-PLB-999 emphasizes that late blight requires immediate aggressive treatment. Apply systemic fungicides containing mefenoxam or cymoxanil at first sign.",
        "According to AgroScope's rapid response protocol, infected plants should be removed and destroyed immediately to prevent explosive spread to neighboring plants.",
      ],
      prevention: [
        "AgroScope Prevention Guidelines stress that weather monitoring is critical. Use late blight forecasting models to time preventative fungicide applications.",
        "Based on AgroScope's certified seed program, always use certified disease-free seed potatoes. Infected seed is a primary source of early-season infections.",
      ],
      identification: [
        "According to AgroScope Diagnostic Manual, late blight creates dark, water-soaked lesions on leaves that rapidly expand. White fungal growth may appear on undersides.",
        "AgroScope's field identification guide notes that late blight can destroy entire fields within days under favorable conditions - cool, wet weather.",
      ],
      default: [
        "AgroScope's late blight management emphasizes prevention over treatment. Once established, this disease is extremely difficult to control.",
        "Historical AgroScope data shows that late blight can reduce yields to zero in untreated fields during epidemic years. Vigilance is essential.",
      ],
    },
  },
  "rice-blast": {
    greeting:
      "Hello! I'm Dr. Green, your rice crop specialist. Rice Blast is a major global threat, and AgroScope's Rice Research Institute has decades of expertise. How can I help you today?",
    expertResponses: {
      treatment: [
        "AgroScope Report #2024-RB-445 recommends fungicides containing tricyclazole or azoxystrobin during critical growth stages - tillering, booting, and heading.",
        "According to AgroScope's treatment timing research, applications just before infection periods are more effective than post-infection treatments.",
      ],
      prevention: [
        "AgroScope's silicon amendment studies show that incorporating silicon into the soil strengthens plant cell walls, reducing blast susceptibility by 40%.",
        "Based on AgroScope water management research, avoiding continuous flooding and maintaining proper water depth reduces favorable conditions for blast development.",
      ],
      identification: [
        "According to AgroScope Diagnostic Standards, rice blast creates characteristic diamond-shaped lesions with gray centers and brown margins on leaves.",
        "AgroScope's field guide notes that neck blast, occurring at the panicle neck, is most damaging as it prevents grain filling and causes yield loss.",
      ],
      default: [
        "AgroScope's integrated blast management combines resistant varieties, balanced fertilization (avoiding excess nitrogen), and strategic fungicide use.",
        "Research from AgroScope shows that rice blast can cause 50-90% yield losses in severe epidemics, making it one of the most economically important rice diseases.",
      ],
    },
  },
  "grapevine-downy-mildew": {
    greeting:
      "Greetings! Dr. Green here, your viticulture specialist. Grapevine Downy Mildew is a serious threat to vineyards, and AgroScope's Viticulture Center has extensive research on its management. What information do you need?",
    expertResponses: {
      treatment: [
        "AgroScope Report #2024-GDM-778 recommends phosphorous acid or copper-based fungicides as preventative treatments. Apply before rainfall events during susceptible growth stages.",
        "According to AgroScope's organic viticulture studies, biofungicides containing Bacillus subtilis show promise, with 60% efficacy in reducing disease when used preventatively.",
      ],
      prevention: [
        "AgroScope's canopy management research emphasizes that proper pruning and leaf removal in the fruit zone improves ventilation and reduces humidity, cutting infection by 50%.",
        "Based on AgroScope vineyard design studies, row orientation and spacing affect disease pressure. North-south rows with adequate spacing dry faster after rain.",
      ],
      identification: [
        "According to AgroScope Diagnostic Manual, downy mildew creates yellow 'oil spot' lesions on upper leaf surfaces with white downy growth underneath.",
        "AgroScope's field identification guide notes that severely infected berries fail to ripen properly and may drop prematurely, significantly reducing yield and quality.",
      ],
      default: [
        "AgroScope's downy mildew management program integrates resistant varieties, cultural practices, and timely fungicide applications for sustainable disease control.",
        "Research from AgroScope shows that weather-based forecasting models help optimize spray timing, reducing applications while maintaining excellent disease control.",
      ],
    },
  },
};

const Chatbot = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const disease = searchParams.get("disease") || "";
  const normalizedDisease = disease.toLowerCase().replace(/\s+/g, "-");
  const diseaseData = diseaseKnowledge[normalizedDisease];

  useEffect(() => {
    if (diseaseData) {
      // Add greeting message with delay
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([
            {
              role: "bot",
              content: diseaseData.greeting,
              timestamp: new Date(),
            },
          ]);
          setIsTyping(false);
        }, 1500);
      }, 500);
    } else {
      setMessages([
        {
          role: "bot",
          content:
            "Hello! I'm Dr. Green, your plant disease specialist. I couldn't identify the specific disease. Could you please tell me which disease you're concerned about?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [normalizedDisease]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getRelevantResponse = (userMessage: string): string => {
    if (!diseaseData) {
      return "I apologize, but I need more information about the specific disease to provide accurate guidance. Could you please specify which plant disease you're dealing with?";
    }

    const messageLower = userMessage.toLowerCase();
    const responses = diseaseData.expertResponses;

    // Match keywords to response categories
    if (
      messageLower.includes("treat") ||
      messageLower.includes("cure") ||
      messageLower.includes("fix") ||
      messageLower.includes("remedy")
    ) {
      const options = responses.treatment || responses.default;
      return options[Math.floor(Math.random() * options.length)];
    }

    if (
      messageLower.includes("prevent") ||
      messageLower.includes("avoid") ||
      messageLower.includes("stop") ||
      messageLower.includes("protection")
    ) {
      const options = responses.prevention || responses.default;
      return options[Math.floor(Math.random() * options.length)];
    }

    if (
      messageLower.includes("identify") ||
      messageLower.includes("symptom") ||
      messageLower.includes("look") ||
      messageLower.includes("spot") ||
      messageLower.includes("recognize")
    ) {
      const options = responses.identification || responses.default;
      return options[Math.floor(Math.random() * options.length)];
    }

    if (
      messageLower.includes("weather") ||
      messageLower.includes("temperature") ||
      messageLower.includes("humidity") ||
      messageLower.includes("climate")
    ) {
      const options = responses.weather || responses.default;
      return options[Math.floor(Math.random() * options.length)];
    }

    // Default response
    const options = responses.default;
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay (1.5-3 seconds)
    const typingDelay = 1500 + Math.random() * 1500;

    setTimeout(() => {
      const botResponse: Message = {
        role: "bot",
        content: getRelevantResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>{" "}
            <div>
              <h1 className="text-lg text-green-700 font-semibold text-foreground">
                Dr. Green
              </h1>
              <p className="text-sm text-muted-foreground">
                Plant Disease Expert
              </p>
            </div>
          </div>
          {disease && (
            <div className="ml-auto">
              <span className="text-sm font-medium text-muted-foreground">
                Disease:{" "}
              </span>
              <span className="text-sm font-semibold text-primary">
                {disease}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-3xl py-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-fg))]"
                    : "bg-[hsl(var(--chat-bot-bg))] text-[hsl(var(--chat-bot-fg))]"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-5 h-5 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="bg-[hsl(var(--chat-bot-bg))] rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-card shadow-lg">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about treatment, prevention, symptoms..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="flex-shrink-0 bg-green-700"
            >
              <Send className="w-4 h-4 " />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Powered by AgroScope Research Institute
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
