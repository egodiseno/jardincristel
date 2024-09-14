(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function l(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=l(a);fetch(a.href,o)}})();document.querySelector("#app").innerHTML=`
<div class="bg-marfil-400 pb-0 mb-0">


<!-- Header -->
<header class="bg-malva-400 text-marfil-50 py-4 px-8 lg:px-16 flex items-center justify-between fixed w-full top-0 left-0 z-50" role="banner">
  <!-- Logo -->
  <div class="flex">
  <a href="#inicio"><h1 class="text-3xl font-berthold-script text-left" tabindex="0">Jardín Cristel</h1></a>
  </div>
  
  <!-- Menú Desktop -->
  <nav class="hidden md:flex flex-1 justify-center" role="navigation" aria-label="Menú principal">
    <ul class="flex space-x-6">
      <li><a href="#inicio" class="text-base hover:text-malva-900 active:text-malva-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-malva-400" aria-label="Ir a Inicio">Inicio</a></li>
      <li><a href="#nosotros" class="text-base hover:text-malva-900 active:text-malva-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-malva-400" aria-label="Ir a Nosotros">Nosotros</a></li>
      <li><a href="#eventos" class="text-base hover:text-malva-900 active:text-malva-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-malva-400" aria-label="Ir a Eventos">Eventos</a></li>
      <li><a href="#galeria" class="text-base hover:text-malva-900 active:text-malva-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-malva-400" aria-label="Ir a Galería">Galería</a></li>
      <li><a href="#contacto" class="text-base hover:text-malva-900 active:text-malva-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-malva-400" aria-label="Ir a Contacto">Contacto</a></li>
    </ul>
  </nav>

  <!-- Botones Desktop -->
  <div class="hidden md:flex space-x-4">
    <a href="https://wa.me/5215536476032?text=Hola%20quiero%20más%20información%20sobre%20los%20eventos%20en%20el%20Jardín%20Cristel.%20¡Gracias!" 
      target="_blank" 
      class="bg-lavanda-800 hover:bg-lavanda-700 active:bg-lavanda-900 p-2 rounded transition ease-in-out duration-300 inline-flex items-center" 
      aria-label="Contactar por WhatsApp" 
      rel="noopener noreferrer">
      <!-- SVG WhatsApp -->
      <svg xmlns="http://www.w3.org/2000/svg" class="text-marfil-50 w-6 h-6" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
      </svg>
    </a>

    <a href="https://www.facebook.com/JardinCristel" target="_blank" rel="noopener noreferrer" aria-label="Visita nuestra página de Facebook">
      <button class="bg-lavanda-800 hover:bg-lavanda-700 active:bg-lavanda-900 p-2 rounded transition ease-in-out duration-300" aria-label="Abrir página de Facebook">
        <!-- SVG Facebook -->
        <svg xmlns="http://www.w3.org/2000/svg" class="text-marfil-50 w-6 h-6" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
        </svg>
      </button>
    </a>
  </div>
  
  <!-- Menú Mobile -->
  <div class="md:hidden flex items-center">
    <button id="menu-toggle" class="text-marfil-50" aria-label="Abrir menú de navegación" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir Menú">
      <!-- SVG Menú Hamburguesa -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
</header>


<!-- Menú desplegable móvil -->
<nav id="mobile-menu" class="fixed inset-0 pt-16 bg-malva-50 text-pizarra-900 transform -translate-y-full transition-transform duration-300 ease-in-out z-40" role="navigation" aria-labelledby="mobile-menu-heading">
  <div class="flex justify-end p-4">
    <button id="close-menu" class="text-pizarra-900 mr-4" aria-label="Cerrar menú" aria-controls="mobile-menu" aria-label="Cerrar Menú">
      <!-- SVG Cerrar Menú -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <h2 id="mobile-menu-heading" class="sr-only">Menú principal</h2>
  <ul class="flex flex-col items-center space-y-4">
    <li><a href="#inicio" class="text-pizarra-900 hover:text-malva-900 active:text-malva-900" tabindex="0">Inicio</a></li>
    <li><a href="#nosotros" class="text-pizarra-900 hover:text-malva-900 active:text-malva-900" tabindex="0">Nosotros</a></li>
    <li><a href="#eventos" class="text-pizarra-900 hover:text-malva-900 active:text-malva-900" tabindex="0">Eventos</a></li>
    <li><a href="#galeria" class="text-pizarra-900 hover:text-malva-900 active:text-malva-900" tabindex="0">Galería</a></li>
    <li><a href="#contacto" class="text-pizarra-900 hover:text-malva-900 active:text-malva-900" tabindex="0">Contacto</a></li>
  </ul>
</nav>


<!-- Inicio -->
<section id="inicio" class="w-full h-screen bg-cover bg-center flex items-center justify-center text-center bg-no-repeat"
  style="background-image: url('./images/hero.webp');" aria-labelledby="inicio-heading">
  <div class="container mx-auto px-4">
    <!-- Título -->
    <h2 id="inicio-heading" class="font-berthold-script text-marfil-50 text-6xl md:text-6xl mb-4" role="heading" aria-level="1">
      Jardín Cristel
    </h2>

    <!-- Imagen debajo del título -->
    <img width="552" height="72" src="./images/detail.webp" loading="lazy" alt="Imagen decorativa con detalles del jardín" class="mx-auto mb-4 w-6/12 lg:w-2/12" />

    <!-- Texto descriptivo -->
    <h5 class="text-marfil-50 text-base md:text-lg">
      <span class="block lg:hidden">Celebra en Jardín Cristel, donde cada detalle cuenta. Tepotzotlán te espera.</span>
      <span class="hidden lg:block lg:px-64 2xl:px-96">Haz que tus celebraciones sean verdaderamente memorables en nuestro encantador jardín en Tepotzotlán. Desde bodas hasta cumpleaños, estamos listos para hacer cada detalle perfecto.</span>
    </h5>

    <!-- Botón para versión desktop -->
    <div class="hidden lg:block mt-16">
      <a href="#eventos" 
        class="inline-flex items-center justify-center px-10 py-4 bg-lavanda-800 text-marfil-50 text-base font-medium rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 transition ease-in-out duration-300" 
        role="button" aria-label="Conoce nuestros eventos">
        <span class="mr-2">Conoce nuestros eventos</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg>
      </a>
    </div>
  </div>
</section>




<!-- Nosotros -->
<section id="nosotros" class="bg-marfil-50 py-16 px-4 lg:px-8 xl:px-32">

  <div class="container mx-auto flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
    <!-- Imagen ajustada para móvil y desktop -->
    <div class="hidden lg:block lg:w-1/2 p-4 lg:p-10">
      <img width="549" height="577" src="./images/nosotros.webp" alt="Grupo de personas disfrutando un evento en Jardín Cristel" class="rounded-t-full lg:rounded-t-[117px] border-8 border-malva-900 w-full h-full mb-4 lg:mb-0">
    </div>

    <!-- Contenido de texto ajustado para móvil y desktop -->
    <div class="lg:w-1/2 text-pizarra-900">
      <h3 class="hidden lg:block text-2xl font-bold text-center text-pizarra-900 mb-4">
        En Jardín Cristel, cada evento se convierte en una celebración inolvidable.
      </h3>
      <h3 class="lg:hidden text-2xl font-bold text-center mb-4 px-8">
        En Jardín Cristel, cada evento es inolvidable.
      </h3>

      <div class="lg:hidden lg:w-1/2 p-4 lg:p-10">
        <img width="549" height="577" src="./images/nosotros.webp" alt="Grupo de personas disfrutando un evento en Jardín Cristel" class="rounded-t-[117px] lg:rounded-lg border-8 border-malva-900 w-full h-full mb-4 lg:mb-0">
      </div>

      <img width="552" height="72" src="./images/detail.webp" loading="lazy" alt="Detalle decorativo del Jardín Cristel" class="mx-auto mb-4 w-7/12 lg:w-4/12">

      <p class="text-base mb-16 text-left lg:text-left">
        Ubicado en el pueblo mágico de Tepotzotlán, nuestro jardín ofrece un ambiente tradicional y acogedor, perfecto para bodas, XV años, bautizos, primeras comuniones, cumpleaños y graduaciones.
        <br><br>
        Nuestro espacio cuenta con un amplio jardín, áreas cubiertas y decoraciones personalizadas que se adaptan a tus necesidades. Además, nuestro equipo dedicado está aquí para ayudarte a cada paso, asegurando que cada detalle sea perfecto.
        <br><br>
        Descubre cómo Jardín Cristel puede hacer de tu evento una experiencia mágica y memorable.
        <br><br>
        <strong>¡Estamos listos para hacer realidad tu celebración!</strong>
      </p>

      <a href="https://wa.me/5215536476032?text=Hola%20quiero%20más%20información%20sobre%20los%20eventos%20en%20el%20Jardín%20Cristel.%20¡Gracias!" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="hidden lg:inline-flex items-center px-10 py-4 bg-lavanda-800 text-marfil-50 rounded-full shadow-md hover:bg-lavanda-700 active:bg-lavanda-900 transition ease-in-out duration-300" 
        aria-label="Solicita tu presupuesto por WhatsApp">
        Solicita tu presupuesto
        <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>
  </div>
</section>




<!-- Sección Eventos -->
<section id="eventos" class="bg-marfil-200 pt-16 pb-32 lg:pt-20 lg:pb-32 px-4 lg:px-4 xl:px-4">
  <div class="container mx-auto text-center">
    <h2 class="text-malva-400 text-4xl font-bold mb-20">
      Nuestros Eventos
    </h2>
  </div>
  <div class="container text-center mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-4">
    
    <!-- 01 Componente Contenedor de Información -->
    <div class="bg-malva-50 border-oliva-900 border-8 rounded-t-[117px] pb-16 max-w-lg mx-auto flex flex-col justify-between h-full">
      <!-- Imagen -->
      <img width="530" height="386" src="./images/bautizo.webp" alt="Decoración de bautizo con flores y velas" class="w-full h-auto rounded-t-[109px]" loading="lazy">

      <!-- Contenedor del Texto y Botón -->
      <div class="flex-grow">
        <!-- Título -->
        <h4 class="text-malva-400 text-3xl font-bold text-left pt-6 px-6 mt-6 mb-4">
          Bautizo
        </h4>

        <!-- Texto descriptivo -->
        <p class="text-pizarra-900 text-base text-left pt-6 px-6 mb-8">
          <b>¡Celebra un día especial!</b> Disfruta de un hermoso bautizo en nuestro encantador jardín de eventos. Espacio amplio, catering exquisito y personal atento para hacer de este día inolvidable. <b>¡Reserva ahora y crea recuerdos inolvidables con tus seres queridos!</b>
        </p>
      </div>

      <!-- Botón con data-title -->
      <a href="#" data-title="Bautizo" class="open-modal inline-flex items-center justify-center px-12 xl:px-16 py-4 bg-lavanda-800 text-marfil-50 rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 drop-shadow-lg hover:drop-shadow-md active:drop-shadow-none transition ease-in-out duration-300 mx-auto mt-auto">
        Más información
        <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>

    <!-- 02 Componente Contenedor de Información -->
    <div class="bg-malva-50 border-oliva-900 border-8 rounded-t-[117px] pb-16 max-w-lg mx-auto flex flex-col justify-between h-full">
      <!-- Imagen -->
      <img width="530" height="386" src="./images/comunion.webp" alt="Celebración de Primera Comunión con decoración religiosa" class="w-full h-auto rounded-t-[109px]" loading="lazy">
      <!-- Contenedor del Texto y Botón -->
      <div class="flex-grow">
        <!-- Título -->
        <h4 class="text-malva-400 text-3xl font-bold text-left pt-6 px-6 mt-6 mb-4">
          1a Comunión
        </h4>

        <!-- Texto descriptivo -->
        <p class="text-pizarra-900 text-base text-left pt-6 px-6 mb-8">
          <b>¡Celebra la Primera Comunión en el corazón de Tepotzotlán!</b> Nuestro encantador jardín de eventos ofrece el entorno ideal para este día especial. Con un entorno pintoresco, catering exquisito y un servicio impecable, garantizamos una experiencia inolvidable para ti y tus seres queridos. <b>¡Reserva ahora y crea recuerdos inolvidables en el centro de Tepotzotlán!</b>
        </p>
      </div>
      <!-- Botón con data-title -->
      <a href="#" data-title="1a Comunion" class="open-modal inline-flex items-center justify-center px-12 xl:px-16 py-4 mt-4 bg-lavanda-800 text-marfil-50 rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 drop-shadow-lg hover:drop-shadow-md active:drop-shadow-none transition ease-in-out duration-300 mx-auto">
        Más información
        <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>
    <!-- 03 Componente Contenedor de Información -->
    <div class="bg-malva-50 border-oliva-900 border-8 rounded-t-[117px] pb-16 max-w-lg mx-auto flex flex-col justify-between h-full">
      <!-- Imagen -->
      <img width="530" height="386" src="./images/xv.webp" alt="Decoración de fiesta de XV años con luces y flores" class="w-full h-auto rounded-t-[109px]" loading="lazy">
      <!-- Contenedor del Texto y Botón -->
      <div class="flex-grow">
        <!-- Título -->
        <h4 class="text-malva-400 text-3xl font-bold text-left pt-6 px-6 mt-6 mb-4">
          XV Años
        </h4>

        <!-- Texto descriptivo -->
        <p class="text-pizarra-900 text-base text-left pt-6 px-6 mb-8">
          <b>¡Celebra tus XV años en grande!</b> Nuestro hermoso jardín de eventos es el lugar perfecto para hacer realidad tus sueños. Desde una decoración elegante hasta un exquisito menú personalizado, nuestro equipo se encargará de cada detalle para que disfrutes al máximo de esta ocasión especial. <b>¡Reserva ahora y haz de tus XV años un día inolvidable!</b>
        </p>
      </div>

      <!-- Botón centrado (visible en pantallas grandes) -->
      <a href="#" data-title="XV Años" class="open-modal inline-flex items-center justify-center px-12 xl:px-16 py-4 mt-4 bg-lavanda-800 text-marfil-50 rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 drop-shadow-lg hover:drop-shadow-md active:drop-shadow-none transition ease-in-out duration-300 mx-auto">
        Más información
        <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </div>


    <!-- 04 Componente Contenedor de Información -->
<div class="bg-malva-50 border-oliva-900 border-8 rounded-t-[117px] pb-16 max-w-lg mx-auto flex flex-col justify-between h-full">
  <!-- Imagen -->
  <img width="530" height="386" src="./images/boda.webp" alt="Decoración de boda con flores y velas" class="w-full h-auto rounded-t-[109px]" loading="lazy">
  <!-- Contenedor del Texto y Botón -->
  <div class="flex-grow">
    <!-- Título -->
    <h4 class="text-malva-400 text-3xl font-bold text-left pt-6 px-6 mt-6 mb-4">
      Boda
    </h4>
    <!-- Contenedor del Texto y Botón -->
    <div class="flex-grow">
      <!-- Texto descriptivo -->
      <p class="text-pizarra-900 text-base text-left pt-6 px-6 mb-8">
        <b>Descubre la perfección en tu gran día.</b> Nuestro jardín de eventos en el centro de Tepotzotlán brinda el escenario ideal para tu boda de ensueño. Con servicios personalizados, entorno pintoresco y una atención excepcional, garantizamos que tu día especial sea inolvidable. <b>¡Reserva ahora y haz realidad tus sueños!</b>
      </p>
    </div>
  </div>
  <!-- Botón centrado (visible en pantallas grandes) -->
  <a href="#" data-title="Boda" class="open-modal inline-flex items-center justify-center px-12 xl:px-16 py-4 mt-4 bg-lavanda-800 text-marfil-50 rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 drop-shadow-lg hover:drop-shadow-md active:drop-shadow-none transition ease-in-out duration-300 mx-auto">
    Más información
    <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </a>
</div>

<!-- 05 Componente Contenedor de Información -->
<div class="bg-malva-50 border-oliva-900 border-8 rounded-t-[117px] pb-16 max-w-lg mx-auto flex flex-col justify-between h-full">
  <!-- Imagen -->
  <img width="530" height="386" src="./images/graduacion.webp" alt="Celebración de graduación con decoración festiva" class="w-full h-auto rounded-t-[109px]" loading="lazy">
  <!-- Contenedor del Texto y Botón -->
  <div class="flex-grow">
    <!-- Título -->
    <h4 class="text-malva-400 text-3xl font-bold text-left pt-6 px-6 mt-6 mb-4">
      Graduación
    </h4>
    <!-- Texto descriptivo -->
    <p class="text-pizarra-900 text-base text-left pt-6 px-6 mb-8">
      <b>¡Celebra tu graduación en el corazón de Tepotzotlán!</b> Nuestro hermoso jardín de eventos te brinda el escenario perfecto para festejar este logro tan especial. Con un ambiente acogedor, deliciosa gastronomía y un equipo atento, aseguramos que tu día sea inolvidable. <b>¡Reserva ahora y marca este hito con estilo en el centro de Tepotzotlán!</b>
    </p>
  </div>
  <!-- Botón centrado (visible en pantallas grandes) -->
  <a href="#" data-title="Graduación" class="open-modal inline-flex items-center justify-center px-12 xl:px-16 py-4 mt-4 bg-lavanda-800 text-marfil-50 rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 drop-shadow-lg hover:drop-shadow-md active:drop-shadow-none transition ease-in-out duration-300 mx-auto">
    Más información
    <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </a>
</div>

<!-- 06 Componente Contenedor de Información -->
<div class="bg-malva-50 border-oliva-900 border-8 rounded-t-[117px] pb-16 max-w-lg mx-auto flex flex-col justify-between h-full">
  <!-- Imagen -->
  <img width="530" height="386" src="./images/empresarial.webp" alt="Decoración para evento empresarial con carreta de flores en Jardín Cristel" class="w-full h-auto rounded-t-[109px]" loading="lazy">
  <!-- Contenedor del Texto y Botón -->
  <div class="flex-grow">
    <!-- Título -->
    <h4 class="text-malva-400 text-3xl font-bold text-left pt-6 px-6 mt-6 mb-4">
      Empresarial
    </h4>
    <!-- Texto descriptivo -->
    <p class="text-pizarra-900 text-base text-left pt-6 px-6 mb-8">
      <b>¡Impulsa tu empresa con estilo en Tepotzotlán!</b> Nuestro jardín de eventos céntrico ofrece el ambiente ideal para reuniones y celebraciones corporativas. Espacios versátiles, comodidades de primer nivel y un entorno encantador garantizan el éxito de tu evento. <b>¡Reserva ahora y brinda a tu equipo una experiencia memorable!</b>
    </p>
  </div>
  <!-- Botón centrado (visible en pantallas grandes) -->
  <a href="#" data-title="Empresarial" class="open-modal inline-flex items-center justify-center px-12 xl:px-16 py-4 mt-4 bg-lavanda-800 text-marfil-50 rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 drop-shadow-lg hover:drop-shadow-md active:drop-shadow-none transition ease-in-out duration-300 mx-auto">
    Más información
    <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </a>
</div>


  </div>
</section>


<!-- Sección Galería -->
<section id="galeria" class="bg-malva-50 pt-16 pb-32 lg:pt-20 lg:pb-32 px-4 lg:px-4">
  <div class="container mx-auto text-center">
    <h2 class="text-malva-400 text-4xl font-bold mb-20">
      Galería
    </h2>
  </div>
  <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <!-- Imagen 1 -->
    <div class="overflow-hidden shadow-lg border-oliva-900 border-8 rounded-tl-[0px] rounded-tr-[40px] md:rounded-tr-[117px] rounded-bl-[40px] md:rounded-bl-[117px] rounded-br-[0px]">
      <img width="530" height="386" src="./images/galeria01.webp" alt="Vista del Jardín Cristel con decoración floral" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
    </div>
    <!-- Imagen 2 -->
    <div class="overflow-hidden shadow-lg border-oliva-900 border-8 rounded-tl-[0px] rounded-tr-[40px] md:rounded-tr-[117px] rounded-bl-[40px] md:rounded-bl-[117px] rounded-br-[0px]">
      <img width="530" height="386" src="./images/galeria02.webp" alt="Configuración de mesas en Jardín Cristel para un evento" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
    </div>
    <!-- Imagen 3 -->
    <div class="overflow-hidden shadow-lg border-oliva-900 border-8 rounded-tl-[0px] rounded-tr-[40px] md:rounded-tr-[117px] rounded-bl-[40px] md:rounded-bl-[117px] rounded-br-[0px]">
      <img width="530" height="386" src="./images/galeria03.webp" alt="Espacio al aire libre en Jardín Cristel decorado para una celebración" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
    </div>
    <!-- Imagen 4 -->
    <div class="overflow-hidden shadow-lg border-oliva-900 border-8 rounded-tl-[0px] rounded-tr-[40px] md:rounded-tr-[117px] rounded-bl-[40px] md:rounded-bl-[117px] rounded-br-[0px]">
      <img width="530" height="386" src="./images/galeria04.webp" alt="Vista panorámica del Jardín Cristel durante un evento" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
    </div>
    <!-- Imagen 5 -->
    <div class="overflow-hidden shadow-lg border-oliva-900 border-8 rounded-tl-[0px] rounded-tr-[40px] md:rounded-tr-[117px] rounded-bl-[40px] md:rounded-bl-[117px] rounded-br-[0px]">
      <img width="530" height="386" src="./images/galeria05.webp" alt="Decoración elegante en el Jardín Cristel para una boda" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
    </div>
    <!-- Imagen 6 -->
    <div class="overflow-hidden shadow-lg border-oliva-900 border-8 rounded-tl-[0px] rounded-tr-[40px] md:rounded-tr-[117px] rounded-bl-[40px] md:rounded-bl-[117px] rounded-br-[0px]">
      <img width="530" height="386" src="./images/galeria06.webp" alt="Ambiente festivo en Jardín Cristel durante una graduación" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
    </div>
  </div>
  <!-- Botón para versión desktop -->
  <div class="flex justify-center mt-16">
    <a href="https://www.facebook.com/JardinCristel/" target="_blank" class="w-full lg:w-4/12 xl:w-3/12 inline-flex items-center justify-center px-10 py-4 bg-lavanda-800 text-marfil-50 text-base font-medium rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 transition ease-in-out duration-300">
      <span class="mr-2">Explora Nuestra Galería</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="text-marfil-50 w-6 h-6" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
      </svg>
    </a>
  </div>
</section>


<!-- Sección Contacto -->
<section id="contacto" class="bg-marfil-400 pt-16 pb-12 lg:pt-0 lg:pb-32 xl:pb-0 px-4" aria-labelledby="contacto-title">
  <div class="container mx-auto lg:flex lg:justify-between lg:items-center min-h-screen lg:min-h-max xl:min-h-screen">
    <!-- Izquierda (Desktop) -->
    <div class="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
      <!-- Título -->
      <h2 id="contacto-title" class="text-malva-400 text-4xl font-bold mb-12">
        Contacto
      </h2>

      <!-- Botón para versión desktop -->
      <div class="lg:hidden block mt-6">
        <a href="https://wa.me/5215536476032?text=Hola%20quiero%20más%20información%20sobre%20los%20eventos%20en%20el%20Jardín%20Cristel.%20¡Gracias!" 
          target="_blank" 
          role="button"
          aria-label="Contacta con nosotros por WhatsApp para más información sobre los eventos en el Jardín Cristel."
          class="w-full inline-flex items-center justify-center px-10 py-4 bg-lavanda-800 text-marfil-50 text-base font-medium rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 focus:outline-none focus:ring-2 focus:ring-lavanda-500 focus:ring-offset-2 transition ease-in-out duration-300">
          <span class="mr-2">¡Hablemos por WhatsApp!</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="text-marfil-50 w-6 h-6" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
          </svg>
        </a>
      </div>

      <!-- Botón para versión desktop -->
      <div class="lg:hidden block mt-12 mb-16">
        <a href="tel:5536476032" 
          class="w-full inline-flex items-center justify-center px-10 py-4 bg-lavanda-800 text-marfil-50 text-base font-medium rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 transition ease-in-out duration-300"
          role="button"
          aria-label="Llamar ahora">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-marfil-50 w-6 h-6" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16" aria-hidden="true">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
          </svg>
          <span class="ml-2">Llamanos ahora</span>
        </a>
      </div>


      <!-- Dirección con Icono SVG de Desktop -->
      <div class="hidden lg:flex items-center mb-4 text-pizarra-900 text-base text-left xl:pr-80 2xl:pr-96">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-geo-alt mr-2" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M12.166 8.94C11.515 10.212 10.415 11.3 9.375 12.24c-.69.611-1.246 1.05-1.505 1.253a.69.69 0 0 1-.736 0c-.26-.202-.815-.641-1.505-1.253C5.585 11.3 4.485 10.212 3.834 8.94 3.133 7.619 3 6.5 3 6a5 5 0 1 1 10 0c0 .5-.133 1.619-.834 2.94z"/>
          <path d="M8 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <p class="text-base" role="text">
          Av. Lic. Benito Juárez 24, San Martin, Tepotzotlán, México.
        </p>
      </div>

      
      <!-- Teléfono con Icono SVG -->
      <div class="hidden lg:flex items-center text-pizarra-900 text-base">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone mr-2" viewBox="0 0 16 16" aria-hidden="true">
          <title>Ícono de Teléfono</title>
          <path d="M3.654 1.328a.678.678 0 0 1 .696-.182l2.276.569c.288.072.492.297.57.525l.829 2.48a.678.678 0 0 1-.184.688l-1.044 1.043a11.745 11.745 0 0 0 5.314 5.314l1.043-1.044a.678.678 0 0 1 .688-.184l2.48.829c.228.078.453.282.525.57l.569 2.276a.678.678 0 0 1-.182.696l-2.063 2.063a1.745 1.745 0 0 1-1.978.332c-2.261-.903-4.317-2.438-6.076-4.197C4.363 9.86 2.828 7.804 1.926 5.543a1.745 1.745 0 0 1 .332-1.978L4.32 1.328z"/>
        </svg>
        <p>55 3647 6032</p>
      </div>


    </div>

    <!-- Derecha (Desktop) -->
    <div class="lg:w-1/2 text-center items-center">
      <!-- Texto del Mapa -->
      <p class="text-pizarra-900 text-base mt-32 mb-8 lg:mb-8 px-4 lg:px-16 xl:px-32" aria-labelledby="map-description">
  Encuéntranos fácilmente en el corazón de Tepotzotlán. <br><b>Haz clic en el mapa</b> para obtener direcciones detalladas a Jardín Cristel.
</p>

      <!-- Mapa de Google Maps -->
      <div class="border-malva-900 border-8 rounded-tl-[0px] rounded-tr-[117px] rounded-bl-[117px] rounded-br-[0px] overflow-hidden w-8/12   mx-auto">
        <a href="https://maps.app.goo.gl/GREPvSYNPcgL9c8D8" target="_blank" rel="noopener noreferrer">
          <img width="530" height="386" src="./images/maps.webp" alt="Abre el Google Maps a Jardín Cristel" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy">
        </a>
      </div>
    </div>

    <!-- Dirección con Icono SVG de Bootstrap -->
    <div class="lg:hidden flex  pt-8 mb-4 px-4 md:px-40 text-pizarra-900 text-base md:text-xl text-center md:text-center text-bold">
        <p>Av. Lic. Benito Juárez 24, San Martin, Tepotzotlán, México.</p>
    </div>
  </div>
</section>



<footer class="bg-malva-400 text-marfil-50 py-4" role="contentinfo">
  <div class="container mx-auto text-center">
    <p class="text-sm md:text-base">
      &copy; 2024 Jardín Cristel. Todos los derechos reservados.
    </p>
  </div>
</footer>





<!-- CTA -->
<div id="cta-container" class="z-50">
  <div id="cta" class="fixed bottom-0 left-0 w-full bg-malva-400 py-4 px-4 lg:hidden transition-transform duration-300 ease-in-out transform translate-y-0">
    <div class="flex justify-center">
      <a 
        id="cta-button" 
        href="https://wa.me/5215536476032?text=Hola%20quiero%20más%20información%20sobre%20los%20eventos%20en%20el%20Jardín%20Cristel.%20¡Gracias!" 
        target="_blank" 
        class="w-full inline-flex items-center justify-center px-10 py-4 bg-lavanda-800 text-marfil-50 text-base font-medium rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 transition ease-in-out duration-300"
        role="button"
        aria-label="Hablemos por WhatsApp"
      >
        <span class="mr-2">¡Hablemos por WhatsApp!</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="text-marfil-50 w-6 h-6" 
          width="16" 
          height="16" 
          fill="currentColor" 
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      </a>
    </div>
  </div>
</div>



<!-- Lightbox Carrusel -->
<div 
  id="lightbox" 
  class="fixed inset-0 bg-stone-900 bg-opacity-80 flex items-center justify-center hidden z-50" 
  role="dialog" 
  aria-labelledby="lightbox-title" 
  aria-modal="true"
>
  <span 
    id="close-lightbox" 
    class="absolute top-6 right-8 text-white text-4xl cursor-pointer" 
    aria-label="Cerrar lightbox" 
    role="button" 
    tabindex="0"
  >&times;</span>
  <span 
    id="prev" 
    class="absolute left-4 lg:left-8 text-white text-4xl lg:text-5xl cursor-pointer hover:text-lavanda-400 transition ease-in-out duration-300" 
    aria-label="Anterior" 
    role="button" 
    tabindex="0"
  >&#10094;</span>
  <img 
    id="lightbox-img" 
    src="" 
    alt="Imagen ampliada" 
    class="max-w-full max-h-full rounded-lg shadow-lg"
  >
  <span 
    id="next" 
    class="absolute right-4 lg:right-8 text-white text-4xl lg:text-5xl cursor-pointer hover:text-lavanda-400 transition ease-in-out duration-300" 
    aria-label="Siguiente" 
    role="button" 
    tabindex="0"
  >&#10095;</span>
</div>


<!-- Modal Background Layer -->
<div 
  id="modal" 
  class="fixed inset-0 bg-pizarra-900 bg-opacity-90 hidden items-center justify-center" 
  role="dialog" 
  aria-labelledby="title-modal" 
  aria-hidden="true"
>
  <!-- Modal Window -->
  <div 
    class="bg-marfil-50 w-11/12 h-5/6 max-w-3xl mx-auto relative p-10 mt-4 rounded-lg shadow-lg transform transition-transform duration-300 scale-0" 
    role="document"
  >
    <!-- Modal Header -->
    <div class="flex justify-between items-center mb-6">
      <h3 
        id="title-modal" 
        class="text-malva-400 text-4xl font-bold"
      >
        Título del Evento
      </h3>
      <button 
        id="closeModal" 
        class="text-malva-400 hover:text-malva-900 active:text-malva-900 focus:outline-none" 
        aria-label="Cerrar modal" 
        aria-controls="modal" 
        aria-expanded="false" 
        role="button" 
        tabindex="0"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="2" 
          stroke="currentColor" 
          class="w-6 h-6"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>
    </div>
    
    <!-- Modal Content -->
    <div 
      id="contact-modal" 
      class="text-pizarra-900 text-base space-y-4 overflow-y-auto h-[85%] lg:h-[70%]"
    >
      <p class="font-bold">Paquete completo</p>
      <p>
        Mínimo de personas: 70<br>
        Máximo de personas: 150<br>
        (de 120 a 150 personas costo extra<br>
        para carpa y pista de baile)
      </p>
      <ul class="list-disc list-inside">
        <li>Jardín por 6 hrs (más media hora de entrada y media hora de salida)</li>
        <li>Mesas cuadradas vestidas (cubre mantel color a su elección)</li>
        <li>Sillas tiffany color chocolate</li>
        <li>1 arreglo floral por mesa (participantes)</li>
        <li>Meseros</li>
        <li>DJ profesional 6 hrs</li>
        <li>Vajilla y cristalería</li>
        <li>Cubiertos</li>
        <li>Hielo y refresco todo el evento (coca-cola, squirt, sidral mundet, agua mineral)</li>
        <li>2 garrafones de agua (jamaica)</li>
        <li>Platos y cucharas desechables para pastel</li>
        <li>Inflable</li>
        <li>Descorche libre</li>
      </ul>
      <p class="font-bold">Menú a elegir:</p>
      <ul class="list-disc list-inside">
        <li>Taquiza</li>
        <li>Tres tiempos</li>
      </ul>
    </div>

    <!-- Modal Footer with Action Button -->
    <div class="mt-8 hidden lg:flex justify-center">
      <footer class="w-full">
        <div class="flex justify-center items-center pt-4">
          <!-- Botón con enlace a WhatsApp -->
          <a 
            href="https://wa.me/5215536476032?text=Hola%20quiero%20más%20información%20sobre%20los%20eventos%20en%20el%20Jardín%20Cristel.%20Gracias!" 
            class="flex items-center justify-center p-6 md:px-16 py-4 bg-lavanda-800 text-marfil-50 rounded-full hover:bg-lavanda-700 active:bg-lavanda-900 shadow-lg transition ease-in-out duration-300"
            target="_blank" 
            aria-label="Solicita tu cotización por WhatsApp"
          >
            Solicita tu cotización
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="text-marfil-50 w-6 h-6 ml-2" 
              width="16" 
              height="16" 
              fill="currentColor" 
              viewBox="0 0 16 16"
            >
              <path 
                d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  </div>
</div>








  </div>
`;document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",function(l){l.preventDefault();const n=this.getAttribute("href").substring(1),a=document.getElementById(n);a&&window.scrollTo({top:a.offsetTop,behavior:"smooth"})})})});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("menu-toggle"),t=document.getElementById("mobile-menu"),l=document.getElementById("close-menu");e.addEventListener("click",()=>{t.classList.toggle("-translate-y-full")}),l.addEventListener("click",()=>{t.classList.add("-translate-y-full")}),document.querySelectorAll("#mobile-menu a").forEach(n=>{n.addEventListener("click",()=>{t.classList.add("-translate-y-full")})})});const x=document.querySelectorAll("nav a"),g=document.querySelectorAll("section");function b(){let e=g.length;for(;--e&&window.scrollY+50<g[e].offsetTop;);x.forEach(t=>t.classList.remove("active")),x[e].classList.add("active")}window.addEventListener("scroll",b);b();const w=document.querySelectorAll("#galeria img"),c=Array.from(w),d=document.getElementById("lightbox"),y=document.getElementById("lightbox-img"),C=document.getElementById("close-lightbox"),L=document.getElementById("prev"),k=document.getElementById("next");let i=0;function p(e){y.src=c[e].src,d.classList.remove("hidden"),i=e}c.forEach((e,t)=>{e.addEventListener("click",()=>{p(t)})});C.addEventListener("click",()=>{d.classList.add("hidden")});d.addEventListener("click",e=>{e.target===d&&d.classList.add("hidden")});L.addEventListener("click",()=>{i>0?i--:i=c.length-1,p(i)});k.addEventListener("click",()=>{i<c.length-1?i++:i=0,p(i)});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("cta"),t=document.getElementById("contacto");e.classList.add("hidden");let l=!1,n=!1;function a(){const u=window.scrollY||document.documentElement.scrollTop;!n&&u>0&&(e.classList.remove("hidden","slide-down"),e.classList.add("slide-up"),n=!0),s(t)?(e.classList.add("slide-down"),e.classList.remove("slide-up"),setTimeout(()=>{e.classList.add("hidden")},800)):n&&(e.classList.remove("hidden","slide-down"),e.classList.add("slide-up")),l=!1}function o(){l||(window.requestAnimationFrame(()=>{a()}),l=!0)}function s(u){const v=u.getBoundingClientRect();return v.top<(window.innerHeight||document.documentElement.clientHeight)&&v.bottom>=0}window.addEventListener("scroll",o)});const m=document.querySelector("#cta-button");let h=!1;function z(){m.classList.add("glowing")}function M(){setTimeout(()=>{m.classList.remove("glowing"),m.classList.add("fade-out")},5e3)}function f(){!h&&window.scrollY>100&&(z(),M(),h=!0,window.removeEventListener("scroll",f))}window.addEventListener("scroll",f);const r=document.getElementById("modal"),B=document.querySelectorAll('a[href="#"]'),E=document.getElementById("closeModal");B.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),r.classList.remove("hidden"),r.classList.add("flex");const l=r.querySelector("div");l.classList.remove("modal-exit-active"),l.classList.add("modal-enter"),setTimeout(()=>{l.classList.remove("modal-enter"),l.classList.add("modal-enter-active")},50),document.body.classList.add("overflow-hidden")})});E.addEventListener("click",()=>{const e=r.querySelector("div");e.classList.remove("modal-enter-active"),e.classList.add("modal-exit-active"),setTimeout(()=>{r.classList.add("hidden"),r.classList.remove("flex"),e.classList.remove("modal-exit-active"),document.body.classList.remove("overflow-hidden")},300)});document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("modal"),t=document.getElementById("title-modal"),l=document.getElementById("closeModal");document.querySelectorAll(".open-modal").forEach(a=>{a.addEventListener("click",function(){console.log("Botón clicado");const o=this.getAttribute("data-title");console.log("Título del evento: ",o),o&&(t.textContent=o),e.classList.remove("hidden"),e.classList.add("flex"),e.querySelector("div").classList.remove("scale-0"),e.querySelector("div").classList.add("scale-100")})}),l.addEventListener("click",function(){e.classList.add("hidden"),e.classList.remove("flex"),e.querySelector("div").classList.add("scale-0"),e.querySelector("div").classList.remove("scale-100")})});
