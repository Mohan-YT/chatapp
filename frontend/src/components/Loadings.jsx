export const LoadingSpin = () => {
  return <span className="loading loading-spinner loading-lg"></span>;
};

export const LoadingBar = () => {
  return <span className="loading loading-bars loading-lg"></span>;
};

export const SidebarSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 justify-start items-center">
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-14 w-14 shrink-0 rounded-full"></div>
          <div className="sm:hidden flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-14 w-14 shrink-0 rounded-full"></div>
          <div className="sm:hidden flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-14 w-14 shrink-0 rounded-full"></div>
          <div className="sm:hidden flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatMessageSkeleton = () => {
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
            <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
        </div>
        <div className="skeleton h-15 w-45"></div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
             <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
        </div>
        <div className="skeleton h-15 w-45"></div>
      </div>

      <div className="chat chat-start">
        <div className="chat-image avatar">
            <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
        </div>
        <div className="skeleton h-15 w-45"></div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
             <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
        </div>
        <div className="skeleton h-15 w-45"></div>
      </div>

      <div className="chat chat-start">
        <div className="chat-image avatar">
            <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
        </div>
        <div className="skeleton h-15 w-45"></div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
             <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
        </div>
        <div className="skeleton h-15 w-45"></div>
      </div>

      <div className="chat chat-start">
        <div className="chat-image avatar">
            <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
        </div>
        <div className="skeleton h-15 w-45"></div>
      </div>
    </>
  );
};
