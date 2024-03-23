import React, { useState } from 'react';
import styles from './FAQ.module.css';

function FAQ() {
  const faqs = [
    { question: 'What is GiveBack?', answer: 'User-friendly website aims to connect people and organizations that wish to provide surplus food, clothing, books, and other goods to those in need.' },
    { question: 'How does the platform work?', answer: 'The platform works by connecting individuals and organizations who have excess goods with those in need within their community. Users can easily share their surplus resources with others through the platform.' },
    { question: 'Is there a cost to use the platform?', answer: 'No, there is no cost to use the platform. It is free for both donors and recipients.' },
    { question: 'What types of resources can be shared on the platform?', answer: 'Users can share a variety of resources including food, clothing, books, household goods, furniture, and school supplies.' },
    { question: 'Is my personal information safe on the platform?', answer: 'Yes, we take the privacy and security of our users seriously. Your personal information is encrypted and protected according to industry standards.' },
    { question: 'What if I have surplus resources but no one in my community is in need?', answer: 'In such cases, you can choose to donate your excess goods to local charities or organizations through the platform.' },
    { question: 'Can I request specific items through the platform?', answer: 'Yes, users can post requests for specific items they are in need of, and others in the community can respond if they are able to fulfill those requests.' },
    { question: 'Is there a limit to how much I can donate or receive?', answer: 'There are no set limits on donations or exchanges. However, we encourage users to be mindful of their community needs and to donate responsibly.' },
    { question: 'Are there any guidelines for posting on the platform?', answer: 'Yes, we have community guidelines in place to ensure a positive and respectful environment for all users. These guidelines are outlined on our website.' },
    { question: 'Can I track the impact of my donations on the platform?', answer: 'Yes, you can track the impact of your donations through our reporting and analytics tools, which provide insights into the number of donations made and their distribution.' },
    { question: 'How can I contact support if I have further questions or encounter issues with the platform?', answer: 'You can reach out to our support team through the contact page on our website, and we will be happy to assist you.' },
    { question: 'How do I know if someone in my community needs the resources I have to offer?', answer: 'The platform utilizes algorithms to match donors with recipients based on their location, preferences, and the items being offered.' },
    
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
      <div className={styles.faqItems}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={() => toggleAnswer(index)}>
              {faq.question}
              <span className={styles.toggleIcon}>{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );

  
}

export default FAQ;
