// backPopup.js
(function (global) {
  const BackPopup = {
    hasShown: false,
    config: {},

    init: function (options) {
      this.config = Object.assign(
        {
          title: "WAIT!",
          message:
            "You’ve qualified to test the latest <strong>Virtually Invisible</strong> hearing aids",
          image: "",
          subtext: "Answer a few short questions and claim your slot!",
          ctaText: "Claim Your Slot",
          ctaUrl: "#",
          declineText: "No thanks",
          animationDuration: 300,
          useCookies: false,
          cookieExpiryDays: 7,
        },
        options || {}
      );

      if (this.hasDismissed()) return;
      if (this.hasShown) return;

      this.hasShown = true;

      this.injectStyles();
      this.injectPopup();
      this.setupBackTrigger();
    },

    hasDismissed: function () {
      if (this.config.useCookies) {
        return document.cookie.includes("backPopupDismissed=true");
      } else {
        return localStorage.getItem("backPopupDismissed") === "true";
      }
    },

    setDismissed: function () {
      if (this.config.useCookies) {
        const d = new Date();
        d.setTime(
          d.getTime() + this.config.cookieExpiryDays * 24 * 60 * 60 * 1000
        );
        document.cookie =
          "backPopupDismissed=true; expires=" + d.toUTCString() + "; path=/";
      } else {
        localStorage.setItem("backPopupDismissed", "true");
      }
    },

    injectStyles: function () {
      const css = `
        #backPopupOverlay {
            display: none;
            position: fixed;
            z-index: 9999;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.7);
            animation: fadeIn ${this.config.animationDuration}ms ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .backPopupContent {
            background: #fff;
            width: 90%;
            max-width: 400px;
            margin: 100px auto;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            animation: popIn ${this.config.animationDuration}ms ease-in-out;
        }

        @keyframes popIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        .backPopupContent img {
            width: 100%;
            border-radius: 5px;
            margin-top: 10px;
        }

        .backPopupContent h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .backPopupContent p {
            margin: 10px 0;
        }

        .backClaimButton {
            display: block;
            background-color: #ff7a00;
            color: white;
            font-weight: bold;
            border: none;
            padding: 12px;
            margin-top: 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }

        .backNoThanks {
            margin-top: 12px;
            color: #666;
            text-decoration: underline;
            cursor: pointer;
        }
      `;
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);
    },

    injectPopup: function () {
      const cfg = this.config;
      const popup = document.createElement("div");
      popup.id = "backPopupOverlay";
      popup.innerHTML = `
        <div class="backPopupContent">
            <h2>${cfg.title}</h2>
            <p>${cfg.message}</p>
            ${cfg.image ? `<img src="${cfg.image}" alt="popup">` : ""}
            <p>${cfg.subtext}</p>
            <button class="backClaimButton" onclick="window.location.href='${
              cfg.ctaUrl
            }'">${cfg.ctaText}</button>
            <div class="backNoThanks" onclick="document.getElementById('backPopupOverlay').style.display='none'; BackPopup.setDismissed();">${
              cfg.declineText
            }</div>
        </div>
      `;
      document.body.appendChild(popup);
    },

    setupBackTrigger: function () {
      history.pushState({ page: 1 }, "", "");
      history.pushState({ page: 2 }, "", "");

      window.onpopstate = (event) => {
        if (event.state && event.state.page === 1) {
          const popup = document.getElementById("backPopupOverlay");
          if (popup) {
            popup.style.display = "block";
            history.pushState({ page: 2 }, "", "");
          }
        }
      };
    },
  };

  global.BackPopup = BackPopup;
})(window);
