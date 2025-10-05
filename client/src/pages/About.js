import React from 'react';

const About = () => {
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
              <a className="text-sm font-medium hover:text-primary" href="/">Inicio</a>
              <a className="text-sm font-medium hover:text-primary" href="/dashboard">Proyectos</a>
              <a className="text-sm font-medium hover:text-primary" href="/community">Participa</a>
              <a className="text-sm font-bold text-primary" href="/about">Nosotros</a>
            </nav>
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-subtle-light text-foreground-light hover:bg-primary/20 dark:bg-subtle-dark dark:text-foreground-dark dark:hover:bg-primary/30">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnl06d312AYlTBg1ZWgpU8C3w8NMtrOMjcwDsV_-1pN3NhDO79iyGXfLAVNDrnNWOOgRgKXC-QuuPBdUKtpqTcXwXnlullVKD_u_IWUvImZBkCtBZ5JSKXvQQcIhA1herHB2CZdCRpLPUAIz53N9n1gOSg9Jx9UOfFTth6jZ7Usjtlc9CVkKwlRk5QvuSX-DNQz4imtgLOpDTg2tfQOBlmKgoCxTGLu55aIfGgug85tadhD5I1E9WIkAlHNBUU256_bfDaJQIpvls")'}}></div>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 md:px-10 lg:px-20 xl:px-40">
          <div className="mx-auto max-w-4xl">
            {/* Hero Section */}
            <section className="mb-16 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-foreground-light dark:text-foreground-dark sm:text-5xl">Acerca de GeoPlan</h2>
              <p className="mt-6 text-lg leading-8 text-muted-light dark:text-muted-dark">
                Una iniciativa educativa, participativa y gamificada que busca transformar la relación entre ciudadanía y territorio mediante tecnología, datos satelitales y conciencia ambiental.
              </p>
            </section>

            {/* Mission Section */}
            <section className="mb-16">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-4">Nuestra Misión</h3>
                  <p className="text-muted-light dark:text-muted-dark mb-4">
                    Diseñar herramientas digitales que permitan simular estrategias urbanas sostenibles, visualizar el impacto ambiental en tiempo real usando datos satelitales, y fomentar la participación ciudadana en la construcción de ciudades más verdes y habitables.
                  </p>
                  <p className="text-muted-light dark:text-muted-dark">
                    Creemos que la tecnología puede ser una fuerza transformadora para crear ciudades más sostenibles, donde cada ciudadano tenga la oportunidad de contribuir al futuro de su comunidad.
                  </p>
                </div>
                <div className="rounded-lg bg-subtle-light dark:bg-subtle-dark p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-primary">eco</span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">Impacto Ambiental</h4>
                    <p className="text-sm text-muted-light dark:text-muted-dark">
                      Utilizamos datos satelitales de la NASA para monitorear y visualizar el impacto ambiental en tiempo real.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-8 text-center">Características Principales</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-6 shadow-sm">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">simulation</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">Simulador de Estrategias</h4>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Simula el impacto de diferentes estrategias urbanas sostenibles como reforestación, transporte limpio y energía renovable.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-6 shadow-sm">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">map</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">Mapas Interactivos</h4>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Visualiza datos ambientales y urbanos en mapas interactivos con información en tiempo real.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-6 shadow-sm">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">warning</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">Alertas Climáticas</h4>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Recibe alertas sobre condiciones climáticas extremas y recomendaciones para proteger tu salud.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-6 shadow-sm">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">groups</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">Participación Ciudadana</h4>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Participa en foros comunitarios, vota por proyectos y comparte tus ideas para mejorar la ciudad.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-6 shadow-sm">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">school</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">Educación Ambiental</h4>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Aprende sobre sostenibilidad urbana y el impacto de nuestras acciones en el medio ambiente.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-6 shadow-sm">
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">satellite_alt</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground-light dark:text-foreground-dark mb-2">Datos Satelitales</h4>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Integramos datos de la NASA EarthData para proporcionar información precisa y actualizada.
                  </p>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-8 text-center">Nuestros Valores</h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-8 shadow-sm">
                  <h4 className="text-xl font-semibold text-foreground-light dark:text-foreground-dark mb-4">Sostenibilidad</h4>
                  <p className="text-muted-light dark:text-muted-dark">
                    Promovemos prácticas urbanas que respetan el medio ambiente y aseguran un futuro sostenible para las próximas generaciones.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-8 shadow-sm">
                  <h4 className="text-xl font-semibold text-foreground-light dark:text-foreground-dark mb-4">Participación</h4>
                  <p className="text-muted-light dark:text-muted-dark">
                    Creemos en el poder de la participación ciudadana para crear ciudades más inclusivas y democráticas.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-8 shadow-sm">
                  <h4 className="text-xl font-semibold text-foreground-light dark:text-foreground-dark mb-4">Transparencia</h4>
                  <p className="text-muted-light dark:text-muted-dark">
                    Utilizamos datos abiertos y transparentes para que todos puedan entender y participar en la toma de decisiones urbanas.
                  </p>
                </div>

                <div className="rounded-lg bg-background-light dark:bg-subtle-dark p-8 shadow-sm">
                  <h4 className="text-xl font-semibold text-foreground-light dark:text-foreground-dark mb-4">Innovación</h4>
                  <p className="text-muted-light dark:text-muted-dark">
                    Aprovechamos la tecnología más avanzada para crear herramientas innovadoras que mejoren la vida urbana.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="text-center">
              <h3 className="text-2xl font-bold text-foreground-light dark:text-foreground-dark mb-4">¿Quieres saber más?</h3>
              <p className="text-muted-light dark:text-muted-dark mb-6">
                Únete a nuestra comunidad y forma parte del cambio hacia una Santa Cruz más sostenible.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/community"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  Participar Ahora
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg border border-subtle-light bg-background-light px-6 py-3 text-sm font-semibold text-foreground-light hover:bg-subtle-light dark:border-subtle-dark dark:bg-background-dark dark:text-foreground-dark dark:hover:bg-subtle-dark"
                >
                  Ver Proyectos
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
