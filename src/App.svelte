<nav>
	<header class="kurshok"> kurshok </header>
</nav>
<main>
	<p>
		Hello, this is a personal site, very much underconstruction
	</p>
</main>

<footer>
	<section class="links">
		<header>Links</header>
		<div>
			<span>github: </span>
			<a href="http://github.com/SaulDoesCode" target="_blank">SaulDoesCode</a>
		</div>
		<div>
			<span>twitter: </span>
			<a href="http://twitter.com/saulvdw">@saulvdw</a>
		</div>
	</section>
</footer>

<style>
	:root {
		--highlight-color: hsl(0, 70%, 60%);
	}
	.kurshok {
		display: inline-block;
		font-size: 1.3em;
		background: var(--highlight-color);
		color: #fff;
		padding: .5em .5em;
		border-radius: .5em;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	footer {
		display: inline-block;
		width: 94vw;
		margin: .5em 2.5vw .5em 2.5vw;
		padding-top: .5em;
		border-top: 1px solid rgb(207, 59, 59);
		box-shadow: inset 0 4px 3px -4px rgb(207, 59, 59, .3);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<script>

</script>