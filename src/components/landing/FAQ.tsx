import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

  return (
    <section className="py-20 bg-[#0F172A]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {t('faq.title')}{" "}
            <span className="text-gradient">{t('faq.titleHighlight')}</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((key, index) =>
            <AccordionItem
              key={key}
              value={`item-${index}`}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl px-6 border border-white/10 shadow-sm data-[state=open]:shadow-md transition-shadow">

                <AccordionTrigger className="text-left font-semibold text-white hover:text-primary py-6 hover:no-underline">
                  {t(`faq.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 pb-6 leading-relaxed">
                  {t(`faq.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
    </section>);

};

export default FAQ;