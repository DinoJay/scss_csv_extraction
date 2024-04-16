
export function load({ params }) {

    // return event.fetch('/sccs_o_044.txt').then((response) => response.text()).then((text) => {
    //     return { text }
    // })
    return {
        post: {
            title: `Title for ${params.slug} goes here`,
            content: `Content for ${params.slug} goes here`
        }
    };
}