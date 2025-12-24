import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Leaf, Info, Sun, Lightbulb, Home, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DiseaseData {
  name: string;
  confidence: number;
  description: string;
  weather: string;
  recommendations: {
    organic: string;
    pruning: string;
    chemical: string;
  };
  image: string;
}

const diseases: DiseaseData[] = [
  {
    name: "Powdery Mildew",
    confidence: 91,
    description:
      "Powdery mildew is a fungal disease that affects a wide range of plants. It is one of the easier plant diseases to identify, as its symptoms are quite distinctive. Infected plants display white powdery spots on the leaves and stems.",
    weather:
      "High humidity and moderate temperatures (60-80°F) are ideal for powdery mildew. Upcoming rain may increase the risk of further spread. Ensure good air circulation around plants.",
    recommendations: {
      organic:
        "Use a neem oil spray on affected areas. Mix 2 teaspoons of neem oil with 1 gallon of water and a few drops of mild dish soap.",
      pruning:
        "Remove and safely destroy infected leaves to prevent the disease from spreading to healthy parts of the plant.",
      chemical:
        "If the infection is severe, consider using a fungicide containing potassium bicarbonate or sulfur. Always follow label instructions.",
    },
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop",
  },
  {
    name: "Soybean Rust",
    confidence: 87,
    description:
      "Soybean rust is a fungal disease that causes tan to dark brown spots on leaves, leading to premature defoliation and yield loss.",
    weather:
      "Warm, humid conditions (68-82°F) and extended leaf wetness favor soybean rust development.",
    recommendations: {
      organic:
        "Apply neem oil or potassium bicarbonate spray to early-stage infections.",
      pruning: "Remove and destroy infected leaves to prevent further spread.",
      chemical:
        "For severe infections, use fungicides containing chlorothalonil or triazoles.",
    },
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop",
  },
  {
    name: "Maize Leaf Blight",
    confidence: 93,
    description:
      "Maize leaf blight causes elongated grayish or tan lesions on leaves, reducing photosynthetic capacity and grain yield.",
    weather:
      "High humidity and temperatures between 70-85°F promote disease spread. Avoid prolonged wet foliage.",
    recommendations: {
      organic:
        "Use compost tea spray to boost plant resistance. Ensure good air circulation.",
      pruning:
        "Remove and dispose of infected lower leaves to reduce inoculum levels.",
      chemical:
        "Apply copper-based fungicides if symptoms persist under wet conditions.",
    },
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
  },
  {
    name: "Tomato Early Blight",
    confidence: 91,
    description:
      "Early blight causes dark concentric rings on older tomato leaves, leading to defoliation and reduced fruit quality.",
    weather:
      "Warm, humid environments (75-85°F) encourage spore production. Rain or overhead irrigation increases spread.",
    recommendations: {
      organic:
        "Apply a baking soda solution (1 tsp per quart of water) or neem oil weekly.",
      pruning: "Remove lower infected leaves and avoid overhead watering.",
      chemical:
        "Use fungicides with copper or mancozeb at first sign of infection.",
    },
    image:
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=400&fit=crop",
  },
  {
    name: "Apple Scab",
    confidence: 88,
    description:
      "Apple scab is a fungal disease causing olive-green to black spots on leaves and fruit, leading to fruit deformity and premature drop.",
    weather:
      "Cool, wet spring weather (55-75°F) with frequent rainfall creates ideal conditions for infection.",
    recommendations: {
      organic:
        "Apply sulfur-based fungicides or lime sulfur during the dormant season.",
      pruning:
        "Prune trees to improve air circulation and remove fallen leaves from the ground.",
      chemical:
        "Use systemic fungicides containing myclobutanil or captan during the growing season.",
    },
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop",
  },
  {
    name: "Wheat Stripe Rust",
    confidence: 89,
    description:
      "Wheat stripe rust produces yellow-orange pustules in stripes on leaves, severely reducing grain yield and quality.",
    weather:
      "Cool temperatures (50-65°F) with high humidity favor rapid disease development and spread.",
    recommendations: {
      organic:
        "Plant resistant varieties and ensure proper crop rotation practices.",
      pruning:
        "Remove volunteer wheat plants that can harbor the disease between seasons.",
      chemical:
        "Apply triazole or strobilurin fungicides at early infection stages.",
    },
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop",
  },
  {
    name: "Citrus Canker",
    confidence: 85,
    description:
      "Citrus canker causes raised, corky lesions on leaves, stems, and fruit, resulting in premature fruit drop and tree decline.",
    weather:
      "Warm, humid conditions (68-86°F) with wind-driven rain facilitate bacterial spread.",
    recommendations: {
      organic:
        "Use copper-based bactericides and maintain tree health through proper nutrition.",
      pruning:
        "Remove and destroy infected branches, sterilizing tools between cuts.",
      chemical:
        "Apply copper hydroxide sprays during susceptible growth periods.",
    },
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=400&fit=crop",
  },
  {
    name: "Potato Late Blight",
    confidence: 94,
    description:
      "Late blight causes dark, water-soaked lesions on leaves and stems, rapidly destroying entire potato crops in favorable conditions.",
    weather:
      "Cool, wet weather (50-70°F) with high humidity creates explosive disease spread. Monitor weather forecasts closely.",
    recommendations: {
      organic:
        "Apply copper fungicides preventatively and remove infected plants immediately.",
      pruning:
        "Destroy infected plant material and ensure proper spacing for air circulation.",
      chemical:
        "Use systemic fungicides containing mefenoxam or cymoxanil for severe outbreaks.",
    },
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop",
  },
  {
    name: "Rice Blast",
    confidence: 90,
    description:
      "Rice blast creates diamond-shaped lesions on leaves and can affect all plant parts, causing significant yield losses.",
    weather:
      "Warm temperatures (77-86°F) with extended leaf wetness from rain or heavy dew promote infection.",
    recommendations: {
      organic:
        "Use silicon amendments to strengthen plant cell walls and improve resistance.",
      pruning:
        "Maintain proper water management and avoid excessive nitrogen fertilization.",
      chemical:
        "Apply fungicides containing tricyclazole or azoxystrobin during critical growth stages.",
    },
    image:
      "https://images.unsplash.com/photo-1536304929831-3f0ef2a9d1e5?w=400&h=400&fit=crop",
  },
  {
    name: "Grapevine Downy Mildew",
    confidence: 86,
    description:
      "Downy mildew produces yellow spots on upper leaf surfaces with white downy growth underneath, affecting grape quality and yield.",
    weather:
      "Moderate temperatures (65-77°F) with rain or heavy dew and high humidity favor disease development.",
    recommendations: {
      organic:
        "Apply biofungicides containing Bacillus subtilis or use potassium bicarbonate sprays.",
      pruning:
        "Improve canopy ventilation through proper pruning and leaf removal in the fruit zone.",
      chemical:
        "Use phosphorous acid or copper-based fungicides as preventative treatments.",
    },
    image:
      "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=400&h=400&fit=crop",
  },
];

export default function AgroScope() {
  const [searchParams] = useSearchParams();
  const [currentDisease, setCurrentDisease] = useState<DiseaseData | null>(
    null
  );
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const diseaseNameFromURL = searchParams.get("disease");

  useEffect(() => {
    if (diseaseNameFromURL) {
      // Normalize the query to match disease names (case-insensitive, spaces vs hyphens)
      const normalizedQuery = diseaseNameFromURL
        .replace(/-/g, " ")
        .toLowerCase();

      const found = diseases.find(
        (d) => d.name.toLowerCase() === normalizedQuery
      );

      if (found) {
        setCurrentDisease(found);
      } else {
        console.warn("No disease found for:", diseaseNameFromURL);
        setCurrentDisease(null);
      }
    } else {
      // Fallback: show first disease if no param
      setCurrentDisease(diseases[0]);
    }
  }, [diseaseNameFromURL]);

  const handleChatProf = () => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      navigate(`/chatbot?disease=${diseaseNameFromURL}`);
    }, 5000);
  };

  if (!currentDisease) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Disease not found
        </h2>
        <p className="text-gray-500">
          We couldn&apos;t find any matching record for “{diseaseNameFromURL}”.
        </p>
      </div>
    );
  }

  return (
    <>
      {isScanning && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white">
          <Loader2 className="w-16 h-16 animate-spin mb-4 text-green-400" />
          <p className="text-lg font-semibold animate-pulse">
            Scanning your plant image...
          </p>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
        <div className="max-w-full mx-auto p-4 -pt-6">
          {/* Header */}
          <div className="bg-white rounded-t-2xl shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800 text-lg">
                AgroScope
              </span>
            </div>
            <Home className="w-5 h-5 text-gray-500" />
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-lg rounded-b-2xl p-6 space-y-6">
            {/* Disease Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentDisease.name}
                </h1>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Confidence Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-teal-600 rounded-full transition-all duration-500"
                        style={{ width: `${currentDisease.confidence}%` }}
                      />
                    </div>
                    <span className="text-lg font-semibold text-teal-600">
                      {currentDisease.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Based on your uploaded image.
                  </p>
                </div>
              </div>
              <div className="ml-4">
                <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border-2 border-gray-200">
                  <img
                    src={currentDisease.image}
                    alt={currentDisease.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-teal-600" />
                <h2 className="font-semibold text-gray-900">Description</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentDisease.description}
              </p>
            </div>

            {/* Weather Insights */}
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-amber-600" />
                <h2 className="font-semibold text-gray-900">
                  Weather Insights
                </h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentDisease.weather}
              </p>
            </div>

            {/* AI Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-teal-600" />
                <h2 className="font-semibold text-gray-900">
                  AI Recommendations
                </h2>
              </div>

              <div className="space-y-3">
                <RecommendationItem
                  title="Organic Solution"
                  text={currentDisease.recommendations.organic}
                />
                <RecommendationItem
                  title="Pruning"
                  text={currentDisease.recommendations.pruning}
                />
                <RecommendationItem
                  title="Chemical Treatment"
                  text={currentDisease.recommendations.chemical}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl transition-colors">
                Learn More
              </button>
              <button
                onClick={() => navigate(`/dashboard`)}
                className="flex-1 bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-medium py-3 rounded-xl transition-colors"
              >
                Try Another Image
              </button>
              <button
                onClick={handleChatProf}
                className="flex-1 bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-medium py-3 rounded-xl transition-colors"
              >
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ✅ helper subcomponent
const RecommendationItem = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => (
  <div className="flex gap-3">
    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <div className="w-2 h-2 rounded-full bg-teal-600" />
    </div>
    <div>
      <p className="font-medium text-gray-900 text-sm mb-1">{title}:</p>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  </div>
);
