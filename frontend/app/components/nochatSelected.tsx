import { MessageCircle, Users } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex-1 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="text-center space-y-5 max-w-md mx-auto">
        <div className="relative flex justify-center items-center">
          <div className="relative flex gap-6">
            <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <MessageCircle className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-indigo-900">
          Start a Conversation
        </h2>

        <p className="text-lg text-indigo-600/90">
          Select a chat or create a new one to begin messaging.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
