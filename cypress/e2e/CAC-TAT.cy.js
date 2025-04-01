const { expect } = require("chai")
const { it } = require("mocha")

describe('Central de Atendimento ao Cliente TAT', () => {
  before(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it.only('Preenche os campos obrigatórios e envia um formulário', () => {
    const longText = Cypress._.repeat('abcdefghojklmnopqrstuvxyz', 100)

    cy.get('#firstName')
    .type('Junior')
    cy.get('#lastName')
    .type('Gontijo')
    cy.get('#email')
    .type('junin_gym@hotmail.com')
    cy.get('#open-text-area')
    .type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    })

  it('exibe mensagem de erro ao submeter o formulário com e-mail com formatação inválida', () => {
    cy.get('#firstName').type('Junior')
    cy.get('#lastName').type('Gontijo')
    cy.get('#email').type('junin_gym@hotmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    })

  it('se um valor não-numérico for digitado, o valor continuará vazio', () => {
    cy.get('#firstName').type('Junior')
    cy.get('#lastName').type('Gontijo')
    cy.get('#email').type('junin_gym@hotmail.com')
    cy.get('#phone')
    .type('abcded')
    .should('have.value', '')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    })
    
    it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
    })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Junior')
    cy.get('#lastName').type('Gontijo')
    cy.get('#email').type('junin_gym@hotmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
      })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Junior')
    .should('have.value', 'Junior')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('Gontijo')
    .should('have.value', 'Gontijo')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('junin_gym@hotmail,com')
    .should('have.value', 'junin_gym@hotmail,com')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type('31999999999')
    .should('have.value', '31999999999')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigátorios', () => {
   cy.contains('button', 'Enviar').click()
   
   cy.get('.error').should('be.visible')
  })
  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Junior',
      lastName: 'Gontijo',
      email: 'juniorgontijo@gmail.com',
      text: 'Teste.'
    }

    cy.fillmandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Youtube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu valor', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })
  it('marca cada tipo de antedimento', () => {
    cy.get('input[type="radio"]')
     .each(typeOfService => {
       cy.wrap(typeOfService)
       .check()
       .should('be.checked')
     })
  })

  it('marca ambos checkboxes, depois desmarca o úiltimo', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Junior')
    cy.get('#lastName').type('Gontijo')
    cy.get('#email').type('junin_gym@hotmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
   it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target').click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
   })

   it('testa a página da política de privacidade de forma independente', () =>{
    
      
})
})