export default function Footer() {
  return (
    <footer className="bg-white text-[#161616] dark:text-[#d4d4d4] dark:bg-[#161616] pt-3 border-t border-neutral-200 dark:border-neutral-700">
      <div className="footer-container">
        <main className="footer mb-0">
          <div className="footer-grid">
            <div className="flex flex-wrap gap-2 justify-between">
              <div className="flex items-center">
                <p className="text-neutral-400 dark:text-neutral-500 text-sm">
                  © {new Date().getFullYear()} Sintu Boro
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </footer>
  );
}
