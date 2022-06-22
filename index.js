// X <i class="fa-solid fa-xmark"></i>
// O <i class="fa-solid fa-o"></i>

const game = document.querySelector("#game");

(function () {
  const spaceId = ["a", "b", "c", "d", "e", "f", "g", "h", "i"].forEach(
    (id) => {
      const div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("id", id);
      div.setAttribute("data-tile", "empty");
      div.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      game.appendChild(div);
    }
  );
})();

const tileX = () => {};
