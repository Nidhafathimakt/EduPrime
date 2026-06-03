const Spinner = ({ fullScreen }) => {
  const cls = fullScreen
    ? "flex min-h-screen items-center justify-center"
    : "flex justify-center py-12";

  return (
    <div className={cls}>
      <div className="h-10 w-10 animate-spin rouded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  );
};

export default Spinner;
