import {
  FiDatabase,
  FiZap,
  FiFilm,
  FiEdit3,
  FiVideo,
  FiArrowDown,
} from "react-icons/fi";

const AgentSystemVisualization = () => {
  const steps = [
    { title: "Product Input", icon: FiDatabase },
    { title: "AI Agents", icon: FiZap },
    { title: "Video Output", icon: FiVideo },
  ];

  const agents = [
    {
      id: 1,
      name: "Brainstormer",
      icon: FiZap,
      color: "from-cyan-500 to-blue-600",
      description: "Generates creative concepts and ad angles",
    },
    {
      id: 2,
      name: "Director",
      icon: FiFilm,
      color: "from-purple-500 to-indigo-600",
      description: "Structures visual narrative and shot sequence",
    },
    {
      id: 3,
      name: "Scriptwriter",
      icon: FiEdit3,
      color: "from-pink-500 to-rose-600",
      description: "Crafts compelling dialogue and voiceover",
    },
    {
      id: 4,
      name: "Videographer",
      icon: FiVideo,
      color: "from-amber-500 to-orange-600",
      description: "Creates final video assets and effects",
    },
  ];

  const videos = [
    { id: 1, title: "Adventure Seeker", duration: "45s" },
    { id: 2, title: "Urban Commuter", duration: "30s" },
    { id: 3, title: "Professional Edition", duration: "60s" },
    { id: 4, title: "Weekend Explorer", duration: "40s" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-black">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Video Ad Creation Pipeline
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our specialized AI agents transform product details into
            professional video ads
          </p>
        </div>

        {/* Vertical Process Flow */}
        <div className="flex flex-col items-center space-y-8">
          {/* Product Input */}
          <div className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-4">
                <FiDatabase className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold text-white">Product Input</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-cyan-100 mb-3">
                  Product Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Product Name
                    </div>
                    <div className="bg-gray-800/70 rounded-lg p-3 text-white border border-gray-700">
                      UltraLight Backpack
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Description
                    </div>
                    <div className="bg-gray-800/70 rounded-lg p-3 text-gray-200 h-32 border border-gray-700">
                      Sleek, water-resistant backpack with ergonomic straps and
                      multiple compartments. Made from durable recycled
                      materials.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyan-100 mb-3">
                  Process
                </h3>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-cyan-400 text-xs">1</span>
                      </div>
                      <span>Enter product details and requirements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-cyan-400 text-xs">2</span>
                      </div>
                      <span>AI analyzes product and target audience</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-cyan-400 text-xs">3</span>
                      </div>
                      <span>Prepares data for AI agent processing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-cyan-400">
            <FiArrowDown className="text-3xl" />
          </div>

          {/* AI Agents */}
          <div className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mr-4">
                <FiZap className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold text-white">AI Agents</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`bg-gradient-to-br ${agent.color}/10 to-transparent border border-gray-700 rounded-xl p-4 hover:border-cyan-500/50 transition-colors`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center mr-3`}
                    >
                      <agent.icon className="text-white text-lg" />
                    </div>
                    <h3 className="font-bold text-white">{agent.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{agent.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="font-semibold text-cyan-100 mb-3">
                Agent Workflow
              </h3>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-3 text-center">
                <div className="text-xs text-cyan-400">Concept</div>
                <div className="text-xs text-gray-400">Structure</div>
                <div className="text-xs text-gray-400">Script</div>
                <div className="text-xs text-gray-400">Production</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-cyan-400">
            <FiArrowDown className="text-3xl" />
          </div>

          {/* Video Output */}
          <div className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mr-4">
                <FiVideo className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold text-white">Video Output</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-colors"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center backdrop-blur-sm border border-cyan-500/20">
                      <FiVideo className="text-cyan-400 text-2xl" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-white">
                        {video.title}
                      </h3>
                      <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex justify-between mt-3">
                      <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded transition">
                        Preview
                      </button>
                      <button className="text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white px-3 py-1.5 rounded transition">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-2.5 px-6 rounded-lg transition-all inline-flex items-center">
                <FiVideo className="mr-2" />
                Generate More Variations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSystemVisualization;
