import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const SlabscanFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
  {
    question: "Apakah ada biaya untuk mendaftar di GIGGO?",
    answer:
    "Tidak ada biaya pendaftaran. GIGGO sepenuhnya gratis untuk kreator. Kami hanya mengambil komisi kecil dari setiap transaksi yang berhasil (10%), sehingga Anda hanya membayar ketika Anda menghasilkan uang."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk mendapat pembayaran?",
    answer:
    "Setelah konten Anda disetujui oleh brand, dana akan dirilis dari escrow dan masuk ke wallet GIGGO Anda. Anda bisa melakukan penarikan kapan saja, dan dana akan sampai ke rekening Anda dalam 1-2 hari kerja."
  },
  {
    question: "Apakah saya harus punya banyak followers untuk bergabung?",
    answer:
    "Tidak! GIGGO terbuka untuk semua kreator, dari micro influencer hingga mega influencer. Yang kami nilai adalah kualitas konten dan engagement rate, bukan hanya jumlah followers."
  },
  {
    question: "Bagaimana jika konten saya ditolak oleh brand?",
    answer:
    "Jika konten ditolak, brand akan memberikan feedback yang jelas. Anda akan mendapat kesempatan untuk melakukan revisi sesuai brief. Dana tetap aman di escrow sampai konten final disetujui."
  },
  {
    question: "Platform apa saja yang didukung?",
    answer:
    "Saat ini GIGGO mendukung Instagram, TikTok, YouTube, dan Twitter. Kami terus menambahkan platform baru berdasarkan kebutuhan kreator dan brand."
  },
  {
    question: "Bagaimana GIGGO melindungi hak kreator?",
    answer:
    "Semua transaksi menggunakan sistem escrow, brief dikontrak secara digital, dan kami memiliki tim dispute resolution yang siap membantu jika ada masalah. Anda juga bisa memberikan rating ke brand setelah kampanye selesai."
  }];


  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-bg-primary">
      <div className="container-slabscan">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Pertanyaan yang{" "}
            <span className="text-gradient">Sering Ditanyakan</span>
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Punya pertanyaan lain? Hubungi kami di{" "}
            <a
              href="mailto:support@giggo.com"
              className="text-brand-emerald hover:text-brand-cyan">

              support@giggo.com
            </a>
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}>

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left transition-all hover:bg-white/5">

                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-emerald shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""}`
                    } />

                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`
                  }>

                  <div className="px-8 pb-6">
                    <p className="text-text-body leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>);

          })}
        </div>
      </div>
    </section>);

};

export default SlabscanFAQ;