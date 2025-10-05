import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-foreground-light dark:text-foreground-dark min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-subtle-light bg-background-light/80 px-10 py-3 backdrop-blur-sm dark:border-subtle-dark dark:bg-background-dark/80">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32428 39.1354 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold">GeoPlan</h1>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <nav className="hidden items-center gap-6 md:flex">
              <Link className="text-sm font-medium hover:text-primary" to="/">Inicio</Link>
              <Link className="text-sm font-medium hover:text-primary" to="/dashboard">Proyectos</Link>
              <Link className="text-sm font-medium hover:text-primary" to="/community">Participa</Link>
              <Link className="text-sm font-medium hover:text-primary" to="/about">Nosotros</Link>
            </nav>
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-subtle-light text-foreground-light hover:bg-primary/20 dark:bg-subtle-dark dark:text-foreground-dark dark:hover:bg-primary/30">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnl06d312AYlTBg1ZWgpU8C3w8NMtrOMjcwDsV_-1pN3NhDO79iyGXfLAVNDrnNWOOgRgKXC-QuuPBdUKtpqTcXwXnlullVKD_u_IWUvImZBkCtBZ5JSKXvQQcIhA1herHB2CZdCRpLPUAIz53N9n1gOSg9Jx9UOfFTth6jZ7Usjtlc9CVkKwlRk5QvuSX-DNQz4imtgLOpDTg2tfQOBlmKgoCxTGLu55aIfGgug85tadhD5I1E9WIkAlHNBUU256_bfDaJQIpvls")'}}></div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 md:px-10 lg:px-20 xl:px-40">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-primary/20">404</h1>
              <h2 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark mb-4">Página no encontrada</h2>
              <p className="text-lg text-muted-light dark:text-muted-dark mb-8">
                Lo sentimos, la página que buscas no existe o ha sido movida.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
              >
                <span className="material-symbols-outlined mr-2">home</span>
                Ir al Inicio
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-subtle-light bg-background-light px-6 py-3 text-sm font-semibold text-foreground-light hover:bg-subtle-light dark:border-subtle-dark dark:bg-background-dark dark:text-foreground-dark dark:hover:bg-subtle-dark"
              >
                <span className="material-symbols-outlined mr-2">dashboard</span>
                Ver Proyectos
              </Link>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-4">Páginas populares</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/simulator"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Simulador de Estrategias
                </Link>
                <Link
                  to="/alerts"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Alertas Climáticas
                </Link>
                <Link
                  to="/community"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Participación Ciudadana
                </Link>
                <Link
                  to="/about"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Acerca de Nosotros
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
