const ChatContainer = () => {
  return (
    <div>
      <div className="flex flex-col h-full w-full">
        <div className="flex-1 flex flex-col p-8 space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div className="flex flex-col">
                  <div className="w-24 h-4 bg-primary/20 rounded" />
                  <div className="w-16 h-4 bg-primary/20 rounded" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div className="flex flex-col">
                  <div className="w-24 h-4 bg-primary/20 rounded" />
                  <div className="w-16 h-4 bg-primary/20 rounded" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div className="flex flex-col">
                  <div className="w-24 h-4 bg-primary/20 rounded" />
                  <div className="w-16 h-4 bg-primary/20 rounded" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div className="flex flex-col">
                  <div className="w-24 h-4 bg-primary/20 rounded" />
                  <div className="w-16 h-4 bg-primary/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatContainer;
