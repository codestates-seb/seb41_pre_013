import styled from 'styled-components';

const FooterContainer = styled.div`
	width: 100%;
	z-index: 1;
	display: flex;
	justify-content: center;
	color: var(--font-color-footer);
	font-size: var(--font-size-0-9rem);
	background-color: var(--footer-bg-color);
	padding: 32px 12px 12px 12px;
	font-family: var(--font-family-tag);
	margin-top: auto;

	footer {
		width: 100%;
		max-width: var(--max-width-main);
		display: flex;
		justify-content: space-between;
	}
	a,
	a:visited {
		color: var(--font-color-footer);
	}
	.footer_logo {
		margin-right: 32px;
	}
	.footer_contact_copyright {
		max-width: 260px;
		flex-grow: 1 1 260px;
		display: flex;
		flex-direction: column;
		font-size: var(--font-size-0-8rem);
		word-wrap: break-word;
		margin-bottom: 24px;

		.contact_us {
			max-width: 260px;
			display: flex;
			justify-content: space-between;
		}
		.row_gap {
			flex-grow: 1;
		}
		.copyright {
			color: var(--font-color-footer);
		}
		.underline {
			text-decoration: underline;
		}
	}

	@media (max-width: 980px) {
		padding-top: 26px;

		footer {
			display: flex;
			flex-direction: column;
		}
		ul {
			display: flex;
		}
		li {
			margin-right: 10px;
		}
		div > h4 {
			margin-bottom: 8px;
		}
		.footer_contact_copyright {
			max-width: 100vw;
			margin-bottom: 12px;

			.contact_us {
				margin-bottom: 10px;
			}
		}

		@media (max-width: 890px) {
			font-size: var(--font-size-0-8rem);
			h4 {
				margin-bottom: 8px;
			}
		}
		@media (max-width: 815px) {
			flex-direction: column;
			padding-top: 16px;

			footer {
				margin-top: 32px;
			}
		}
	}
`;

const SiteMapBox = styled.div`
	margin-right: 12px;
	margin-bottom: 24px;

	h4 {
		color: var(--font-color-footer);
		margin-bottom: 12px;
	}
	li {
		margin-bottom: 8px;
		list-style: none;
	}
`;

function Footer() {
	return (
		<FooterContainer>
			<div className="footer_logo">
				<a href="/" aria-label="Stack Overflow">
					<svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
						<path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB" />
						<path
							d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
							fill="#F48024"
						/>
					</svg>
				</a>
			</div>
			<footer>
				<SiteMapBox>
					<h4>STACK OVERFLOW</h4>
					<ul>
						<li>
							<a href="/question">Questions</a>
						</li>
						<li>
							<a href="/">Help</a>
						</li>
					</ul>
				</SiteMapBox>
				<SiteMapBox>
					<h4>PRODUCTS</h4>
					<ul>
						<li>
							<a href="/">Teams</a>
						</li>
						<li>
							<a href="/">Advertising</a>
						</li>
						<li>
							<a href="/">Collectives</a>
						</li>
						<li>
							<a href="/">Talent</a>
						</li>
					</ul>
				</SiteMapBox>
				<SiteMapBox>
					<h4>COMPANY</h4>
					<ul>
						<li>
							<a href="/">About</a>
						</li>
						<li>
							<a href="/">Press</a>
						</li>
						<li>
							<a href="/">Work Here </a>
						</li>
						<li>
							<a href="/">Legal</a>
						</li>
						<li>
							<a href="/">Privacy Policy </a>
						</li>
						<li>
							<a href="/">Terms of Service </a>
						</li>
						<li>
							<a href="/">Contract Us</a>
						</li>
						<li>
							<a href="/">Cookie Settings</a>
						</li>
						<li>
							<a href="/">Cookie Policy</a>
						</li>
					</ul>
				</SiteMapBox>
				<SiteMapBox>
					<h4>STACK EXCHANGE NETWORK</h4>
					<ul>
						<li>
							<a href="/">Technology</a>
						</li>
						<li>
							<a href="/">Culture & recreation</a>
						</li>
						<li>
							<a href="/">Life & arts</a>
						</li>
						<li>
							<a href="/">Science</a>
						</li>
						<li>
							<a href="/">Professional</a>
						</li>
						<li></li>
						<li>
							<a href="/">API</a>
						</li>
						<li>
							<a href="/">Data</a>
						</li>
						<li>
							<a href="/">Cookie Policy</a>
						</li>
					</ul>
				</SiteMapBox>
				<div className="footer_contact_copyright">
					<div className="contact_us">
						<a href="https://stackoverflow.blog?blb=1">Blog</a>
						<a href="https://www.facebook.com/officialstackoverflow/">
							Facebook
						</a>
						<a href="https://twitter.com/stackoverflow">Twitter</a>
						<a href="https://linkedin.com/company/stack-overflow">LinkedIn</a>
						<a href="https://www.instagram.com/thestackoverflow">Instagram</a>
					</div>
					<p className="row_gap"></p>
					<p className="copyright">
						Site design / logo &#169; 2022 Stack Exchange Inc; user
						contributions licensed under{' '}
						<span className="underline">CC BY-SA</span>.
						rev&nbsp;2022.12.19.43125
					</p>
				</div>
			</footer>
		</FooterContainer>
	);
}

export default Footer;
