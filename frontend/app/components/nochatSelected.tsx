import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full min-h-screen lg:h-full flex-1 my-auto flex flex-col items-center justify-center p-16 lg:py-16 pr-0 lg:pl-20 bg-base-100/50">
      <div className="text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Maven!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
