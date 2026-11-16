// Moving to the home page (e.g. after logging in) closes the popup: the
// slot must match "/" with something that renders nothing, otherwise the
// last popup would stay on screen.
export default function ModalHome() {
  return null;
}
