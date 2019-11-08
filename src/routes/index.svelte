<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<script>

	import Button from "../components/UI/Button.svelte";
	import netlifyIdentity from "netlify-identity-widget"
	//import { user } from '../store.js'

	import { goto } from '@sapper/app'
	import { onMount } from 'svelte';

	netlifyIdentity.init();
	console.log('Current user is: ', netlifyIdentity.currentUser())

	// Put a test user in a store to make sure UI works. Then set it from functions.
	
	// !! converts user to boolean value, so isLoggedIn will give us true or false.
	$: isLoggedIn = !!netlifyIdentity.currentUser()

	// $: reactive. $ to access user store. !== if not null, get username value from store,
	// and set it to name. Otherwise just set it to generic 'user'
	$: name = netlifyIdentity.currentUser() !== null ? netlifyIdentity.currentUser() : ' user!'

	function handleUserAction(action) {
    if (action == 'login' || action == 'signup') {
	  console.log('logging in')
	  netlifyIdentity.open('login')
    } else if (action == 'logout') {
	  console.log('logging out')
	  netlifyIdentity.logout()
	  sapper.goto('/blog')
    }
  }
	
	// onMount(() => {
    
    
    // fetch("/.netlify/functions/hello")
    //   .then(response => response.json())
    //   .then(json => console.log(json))
	// });

	function lambdaTest() {
		console.log('Functions are coming...');
		
		fetch("/.netlify/functions/hello")
      		.then(response => response.json())
      		.then(json => console.log(json))
  
 }

</script>

<svelte:head>
	<title>Sojourn</title>
	<script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>

<p>
<Button on:click={lambdaTest}>Login Function Test</Button>
</p>

{#if isLoggedIn}
    <div>
      <p>Hello {name}</p>
      <div>
        <Button on:click={() => handleUserAction('logout')}>Log Out</Button>
      </div>
    </div>
  {:else}
    <div>
      <p>You are not logged in.</p>
      <div>
        <Button on:click={() => handleUserAction('login')}>Log In</Button>
        <Button on:click={() => handleUserAction('signup')}>Sign Up</Button>
      </div>
    </div>
{/if}


