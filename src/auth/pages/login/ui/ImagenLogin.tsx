import ImageFondo from "@/assets/banner01kao.webp";

export const ImagenLogin = () => {
  return (
    <div className="w-1/2 relative flex items-center justify-center p-8">
      {/* Imagen de fondo */}
      <img src={ImageFondo} alt="Fondo" className="absolute inset-0 w-full h-full object-cover" />

      {/* Overlay negro */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Contenido */}
    </div>
  );
};
