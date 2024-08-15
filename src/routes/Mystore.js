
const { enqueueSnackbar } = useSnackbar();

const errorMessage =
error.response?.data?.message || "server  error";
enqueueSnackbar(errorMessage, { variant: "error" });

if (propertyList.length === 0) {
    return <div>No Buy properties available.</div>; 
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">
          This post is not available now.
        </h1>
      </div>
    );
  }

