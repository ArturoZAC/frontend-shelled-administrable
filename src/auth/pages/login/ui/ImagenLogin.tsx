export const ImagenLogin = () => {
  return (
    <div className="w-1/2 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-8">
      <div className="text-center text-primary-foreground">
        <svg
          className="w-32 h-32 mx-auto mb-6 opacity-80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-3xl font-bold mb-4">Panel Administrativo</h2>
        <p className="text-lg opacity-90">Gestiona tus servicios de forma eficiente</p>
      </div>
    </div>
  );
};
